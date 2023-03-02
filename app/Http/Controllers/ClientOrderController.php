<?php

namespace App\Http\Controllers;

use App\Events\OrderCreated;
use App\Models\Layanan;
use App\Models\Lokasi;
use App\Models\Order;
use App\Models\Schedule;
use App\Services\Midtrans\CreateSnapTokenService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Midtrans\Snap;

class ClientOrderController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return redirect()->route('client-order.data');
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $request->validate([
      'nama_penumpang' => 'required|string|max:255',
      'tanggal_pemberangkatan' => 'required|date',
      'jumlah_seat' => 'required|numeric',
      'layanan' => 'required|numeric',
      'latlng_asal' => 'required',
      'latlng_tujuan' => 'required',
      'alamat_asal' => 'required|string|max:255',
      'alamat_tujuan' => 'required|string|max:255',
      'deskripsi_asal' => 'string|nullable',
      'deskripsi_tujuan' => 'string|nullable'
    ]);

    $lokasi = Lokasi::create([
      'lat_asal' => $request->latlng_asal["lat"],
      'lng_asal' => $request->latlng_asal["lng"],
      'lat_tujuan' => $request->latlng_tujuan["lat"],
      'lng_tujuan' => $request->latlng_tujuan["lng"],
      'alamat_asal' => $request->alamat_asal,
      'alamat_tujuan' => $request->alamat_tujuan,
      'deskripsi_asal' => $request->deskripsi_asal,
      'deskripsi_tujuan' => $request->deskripsi_tujuan
    ]);

    $total_harga = (Layanan::where('id', $request->layanan)->first('biaya_jasa')->biaya_jasa) * ($request->jumlah_seat);
    $order = Order::create([
      'id_lokasi' => $lokasi->id,
      'id_layanan' => $request->layanan,
      'id_user' => auth()->user()->id,
      'nama_penumpang' => $request->nama_penumpang,
      'tanggal_pemberangkatan' => Carbon::parse($request->tanggal_pemberangkatan, 'UTC')->format('Y-m-d'),
      'status_pembayaran' => 'init',
      'total_seat' => $request->jumlah_seat,
      'total_harga' => $total_harga
    ]);

    $dt = Carbon::parse($order->created_at)->getTimestamp();
    Order::where('id', $order->id)->update([
      'id_payment' => $order->id . "_" . $order->id_user . "_" . $dt,
    ]);

    return redirect()
      ->route('client-order.payment', ['id' => $order->id])
      ->with('message', $order);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function show(Order $order)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function edit(Order $order)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Order $order)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function destroy(Order $order)
  {
    //
  }

  public function clientOrderData(Request $request)
  {
    DB::statement("SET SQL_MODE=''");
    $dateStart = Carbon::now()->toDateString();
    $idSchedule = 1;
    if ($request->tanggalPemberangkatan) {
      $dateStart = Carbon::parse($request->tanggalPemberangkatan)->toDateString();
      $idSchedule = $request->idJadwal;
    }

    $dataLayananKeberangkatan = Order::with('schedule')
      ->where('status_pembayaran', 'confirmed')
      ->where('tanggal_pemberangkatan', [$dateStart])
      ->where('id_schedule', $idSchedule)
      ->get();

    $jumlahSeatTerpesan = $dataLayananKeberangkatan->reduce(function ($carry, $item) {
      return $carry + $item->total_seat;
    });

    $jadwal = Layanan::with([
      'schedules' => [
        'kendaraan',
      ],
    ])
      ->whereHas('schedules', function ($query) {
        $query->where('status', '=', 'active');
      })->get();

    $jadwalDipilih = Schedule::where('id', $idSchedule)->with('kendaraan')->first();
    $seatSisa = $jadwalDipilih?->kendaraan?->jumlah_seat - $jumlahSeatTerpesan;
    $seatTotal = $jadwalDipilih->kendaraan->jumlah_seat;

    $jadwalFull = Schedule::all();

    return Inertia::render('Client/FormPageOrder', [
      'type' => 'data',
      'jadwalData' => $jadwal,
      'jadwalFull' => $jadwalFull,
      'dateStart' => $dateStart,
      'seatSisa' => $seatSisa,
      'seatTotal' => $seatTotal
    ]);
  }

  public function clientOrderJemput()
  {
    DB::statement("SET SQL_MODE=''");
    $dateStart = Carbon::now()->toDateString();

    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    return Inertia::render('Client/FormPageOrder', [
      'type' => 'jemput',
      'dateStart' => $dateStart,
      'layananData' => $layanan
    ]);
  }

  public function clientOrderTujuan()
  {
    DB::statement("SET SQL_MODE=''");
    $dateStart = Carbon::now()->toDateString();

    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    return Inertia::render('Client/FormPageOrder', [
      'type' => 'tujuan',
      'dateStart' => $dateStart,
      'layananData' => $layanan
    ]);
  }

  public function clientPayment($id)
  {
    $order = Order::where('id', $id)->first();
    $order->user;
    $order->lokasi;
    $order->layanan;
    if (auth()->user()->id !== $order->user->id) {
      return redirect("dashboard");
    }

    if ($order->status_pembayaran === 'init') {
      $snap = new CreateSnapTokenService();
      $snapToken = $snap->getSnapToken([
        'transaction_details' => [
          'order_id' => $order->id_payment,
          'gross_amount' => $order->total_harga,
        ],
        'item_details' => [
          [
            'id' => $order->layanan->id,
            'price' => $order->layanan->biaya_jasa,
            'quantity' => $order->total_seat,
            'name' => 'Travel ' . $order->layanan->kota_asal . ' ' . $order->layanan->kota_tujuan,
          ],
        ],
        'customer_details' => [
          'first_name' => $order->user->nama_user,
          'email' => $order->user->email,
          'phone' => $order->user->telepon_user,
        ]
      ]);

      $order->update([
        'status_pembayaran' => 'pending',
        'snap_token' => $snapToken
      ]);
      broadcast(new OrderCreated($order, 'add'))->toOthers();
    } else if (
      $order->status_pembayaran === 'pending'
      || $order->status_pembayaran === 'done'
      || $order->status_pembayaran === 'confirmed'
      || $order->status_pembayaran === 'failed'
    ) {
      $snapToken = $order->snap_token;
    }

    return Inertia::render('Client/Payment', [
      'order' => $order,
      'serverKey' => config('midtrans.server_key'),
      'clientKey' => config('midtrans.client_key'),
      'snapToken' => $snapToken
    ]);
  }
}
