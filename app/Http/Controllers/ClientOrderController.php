<?php

namespace App\Http\Controllers;

use App\Events\OrderCreated;
use App\Models\Layanan;
use App\Models\Lokasi;
use App\Models\Order;
use App\Models\Schedule;
use App\Models\Seat;
use App\Services\Midtrans\CreateSnapTokenService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
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
    DB::statement("SET SQL_MODE=''");
    $request->validate([
      'nama_penumpang' => 'required|string|max:255',
      'tanggal_pemberangkatan' => 'required|date',
      'jumlah_seat' => 'required|numeric',
      'jadwal' => 'required|numeric',
      'latlng_asal' => 'required',
      'latlng_tujuan' => 'required',
      'alamat_asal' => 'required|string|max:255',
      'alamat_tujuan' => 'required|string|max:255',
      'deskripsi_asal' => 'string|nullable',
      'deskripsi_tujuan' => 'string|nullable',
      'seatSelected' => ["array", "min:0"]
    ]);

    $jumlahSeat = $request->jumlah_seat;
    $seatSelected = $request->seatSelected;
    if ($jumlahSeat == 0) {
      $dateStart = Carbon::parse($request->tanggal_pemberangkatan)->toDateString();
      $dataLayananKeberangkatan = Order::with(['schedule' => ['kendaraan']])
        ->where('status_pembayaran', 'confirmed')
        ->where('tanggal_pemberangkatan', [$dateStart])
        ->where('id_schedule', $request->jadwal)
        ->get();

      $totalSeat = $dataLayananKeberangkatan[0];

      $seatTerpesan = collect(Arr::flatten($dataLayananKeberangkatan->map(function ($item) {
        return $item->seats;
      })));

      $seatMap = collect($seatTerpesan->map(function ($item) {
        return $item->seat_number;
      }))->sort();

      $jumlahSeat = 1;
      if (count($seatMap) + 1 <= $totalSeat->schedule->kendaraan->jumlah_seat) {
        $seatTerpilih = 1;

        for ($i = 1; $i <= $totalSeat->schedule->kendaraan->jumlah_seat; $i++) {
          if (!$seatMap->contains($i)) {
            $seatTerpilih = $i;
            break;
          }
        }
        array_push($seatSelected, [
          "seatNumber" => $seatTerpilih
        ]);
      }
    }

    if ($request->biaya_tambahan > 0) {
      $total_harga = ((Schedule::where('id', $request->jadwal)->with('layanan')->first()->layanan->biaya_jasa) * ($jumlahSeat)) + $request->biaya_tambahan;
    } else {
      $total_harga = (Schedule::where('id', $request->jadwal)->with('layanan')->first()->layanan->biaya_jasa) * ($jumlahSeat);
    }

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

    $order = Order::create([
      'id_lokasi' => $lokasi->id,
      'id_schedule' => $request->jadwal,
      'id_user' => auth()->user()->id,
      'nama_penumpang' => $request->nama_penumpang,
      'tanggal_pemberangkatan' => Carbon::parse($request->tanggal_pemberangkatan, 'UTC')->format('Y-m-d'),
      'status_pembayaran' => 'init',
      'total_seat' => $jumlahSeat,
      'total_harga' => $total_harga
    ]);

    $dt = Carbon::parse($order->created_at)->getTimestamp();
    Order::where('id', $order->id)->update([
      'id_payment' => $order->id . "_" . $order->id_user . "_" . $dt,
    ]);

    foreach ($seatSelected as $value) {
      Seat::create([
        'id_order' => $order->id,
        'seat_number' => $value['seatNumber']
      ]);
    }

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

    $seatTerpesan = Arr::flatten($dataLayananKeberangkatan->map(function ($item) {
      return $item->seats;
    }));
    $seatTotal = $jadwalDipilih->kendaraan->jumlah_seat;
    $jadwalFull = Schedule::all();

    return Inertia::render('Client/FormPageOrder', [
      'type' => 'data',
      'jadwalData' => $jadwal,
      'jadwalFull' => $jadwalFull,
      'seatSelected' => $seatTerpesan,
      'dateStart' => $dateStart,
      'seatSisa' => $seatSisa,
      'seatTotal' => $seatTotal
    ]);
  }

  public function clientOrderJemput()
  {
    DB::statement("SET SQL_MODE=''");
    $dateStart = Carbon::now()->toDateString();

    $jadwal = Layanan::with([
      'schedules' => [
        'kendaraan',
      ],
    ])
      ->whereHas('schedules', function ($query) {
        $query->where('status', '=', 'active');
      })
      ->get();

    $jadwalFull = Schedule::all();

    return Inertia::render('Client/FormPageOrder', [
      'type' => 'jemput',
      'dateStart' => $dateStart,
      'jadwalFull' => $jadwalFull,
      'jadwalData' => $jadwal
    ]);
  }

  public function clientOrderTujuan()
  {
    DB::statement("SET SQL_MODE=''");
    $dateStart = Carbon::now()->toDateString();

    $jadwal = Layanan::with([
      'schedules' => [
        'kendaraan',
      ],
    ])
      ->whereHas('schedules', function ($query) {
        $query->where('status', '=', 'active');
      })
      ->get();

    $jadwalFull = Schedule::all();

    return Inertia::render('Client/FormPageOrder', [
      'type' => 'tujuan',
      'dateStart' => $dateStart,
      'jadwalFull' => $jadwalFull,
      'jadwalData' => $jadwal
    ]);
  }

  public function clientPayment($id)
  {
    $order = Order::where('id', $id)->first();
    $order->user;
    $order->lokasi;
    $order->schedule->layanan;
    if (auth()->user()->id !== $order->user->id) {
      return redirect("dashboard");
    }

    if ($order->status_pembayaran === 'init') {
      $hargaSatuan = floatval(number_format((float) ($order->total_harga / $order->total_seat), 0, '.', ''));

      $snap = new CreateSnapTokenService();
      $snapToken = $snap->getSnapToken([
        'transaction_details' => [
          'order_id' => $order->id_payment,
          'gross_amount' => $order->total_harga,
        ],
        'item_details' => [
          [
            'id' => $order->schedule->layanan->id,
            'price' => $hargaSatuan,
            'quantity' => $order->total_seat,
            'name' => 'Travel ' . $order->schedule->layanan->kota_asal . ' ' . $order->schedule->layanan->kota_tujuan,
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
