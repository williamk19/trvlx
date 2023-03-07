<?php

namespace App\Http\Controllers;

use App\Events\OrderCreated;
use App\Events\OrderPaid;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Mail\OrderConfirmed;
use App\Models\Layanan;
use App\Models\Lokasi;
use App\Models\Schedule;
use App\Models\Seat;
use App\Models\User;
use App\Services\Midtrans\CallbackService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Mockery\Undefined;

class OrderController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('Admin/Order');
  }

  public function orderData(Request $request)
  {
    DB::statement("SET SQL_MODE=''");
    $dateStart = Carbon::now()->toDateString();
    $idSchedule = 1;
    if ($request->tanggalPemberangkatan) {
      $dateStart = Carbon::parse($request->tanggalPemberangkatan)->toDateString();
      $idSchedule = $request->idJadwal;
    }

    $dataLayananKeberangkatan = Order::with('schedule', 'seats')
      ->where('status_pembayaran', 'confirmed')
      ->where('tanggal_pemberangkatan', [$dateStart])
      ->where('id_schedule', $idSchedule)
      ->get();

    $seatTerpesan = Arr::flatten($dataLayananKeberangkatan->map(function ($item) {
      return $item->seats;
    }));

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
      })
      ->get();

    $jadwalDipilih = Schedule::where('id', $idSchedule)->with('kendaraan')->first();
    $seatSisa = $jadwalDipilih?->kendaraan?->jumlah_seat - $jumlahSeatTerpesan;
    $seatTotal = $jadwalDipilih->kendaraan->jumlah_seat;

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'data',
      'jadwalData' => $jadwal,
      'seatSelected' => $seatTerpesan,
      'dateStart' => $dateStart,
      'seatSisa' => $seatSisa,
      'seatTotal' => $seatTotal
    ]);
  }

  public function orderJemput()
  {
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

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'jemput',
      'dateStart' => $dateStart,
      'jadwalData' => $jadwal
    ]);
  }

  public function orderTujuan()
  {
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

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'tujuan',
      'dateStart' => $dateStart,
      'jadwalData' => $jadwal
    ]);
  }

  public function orderList(Request $request)
  {
    $userSearch = null;
    if ($request->search != '') {
      $userSearch = User::where('nama_user', 'like', '%' . $request->search . '%')->first();
    }

    $dataOrder = Order::where('nama_penumpang', 'like', '%' . $request->search . '%')
      ->orWhere('id_user', $userSearch ? $userSearch->id : -1)
      ->orderBy('created_at', 'desc')
      ->with(['schedule' => ['layanan']])
      ->paginate(5)
      ->through(
        fn ($item) =>
        [
          'id' => $item->id,
          'nama_penumpang' => $item->nama_penumpang,
          'tanggal_pemberangkatan' => $item->tanggal_pemberangkatan,
          'status_pembayaran' => $item->status_pembayaran,
          'jadwal' => $item->schedule
        ]
      );

    return Inertia::render('Admin/OrderDataPage', [
      'title' => 'List Order Travel',
      'query' => $request->search,
      'order' => $dataOrder
    ]);
  }
  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return redirect('/order/data');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreOrderRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreOrderRequest $request)
  {
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
      'seatSelected' => ["required", "array", "min:0"]
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

    $total_harga = (Schedule::where('id', $request->jadwal)->first()->layanan->biaya_jasa) * ($request->jumlah_seat);
    $order = Order::create([
      'id_lokasi' => $lokasi->id,
      'id_schedule' => $request->jadwal,
      'id_user' => 1,
      'nama_penumpang' => $request->nama_penumpang,
      'tanggal_pemberangkatan' => Carbon::parse($request->tanggal_pemberangkatan, 'UTC')->format('Y-m-d'),
      'status_pembayaran' => 'confirmed',
      'total_seat' => $request->jumlah_seat,
      'total_harga' => $total_harga
    ]);

    $dt = Carbon::parse($order->created_at)->getTimestamp();
    Order::where('id', $order->id)->update([
      'id_payment' => $order->id . "_" . $order->id_user . "_" . $dt,
    ]);

    foreach ($request->seatSelected as $value) {
      Seat::create([
        'id_order' => $order->id,
        'seat_number' => $value['seatNumber']
      ]);
    }

    return redirect()
      ->route('order.index')
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
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */

  public function editData(Request $request, $id)
  {
    $orderEdit = Order::where('id', $id)->with(['lokasi', 'user', 'schedule'])->first();

    DB::statement("SET SQL_MODE=''");
    $dateStart = Carbon::parse($orderEdit->tanggal_pemberangkatan)->toDateString();
    $idSchedule = $orderEdit->id_schedule;
    if ($request->tanggalPemberangkatan) {
      $dateStart = Carbon::parse($request->tanggalPemberangkatan)->toDateString();
      $idSchedule = $request->idJadwal;
    }

    $dataLayananKeberangkatan = Order::with(['schedule' => ['kendaraan']])
      ->where('status_pembayaran', 'confirmed')
      ->where('tanggal_pemberangkatan', [$dateStart])
      ->where('id_schedule', $idSchedule)
      ->get();

    $jumlahSeatTerpesan = $dataLayananKeberangkatan->reduce(function ($carry, $item) {
      return $carry + $item->total_seat;
    });

    $jadwalDipilih = Schedule::where('id', $idSchedule)->with('kendaraan')->first();
    $seatSisa = $jadwalDipilih->kendaraan->jumlah_seat - $jumlahSeatTerpesan;
    $seatTotal = $jadwalDipilih->kendaraan->jumlah_seat;

    $jadwal = Layanan::with([
      'schedules' => [
        'kendaraan',
      ],
    ])
      ->whereHas('schedules', function ($query) {
        $query->where('status', '=', 'active');
      })
      ->get();

    $seatSelected = Seat::where('id_order', $id)->get();

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'data',
      'edit' => true,
      'orderId' => $id,
      'jadwalData' => $jadwal,
      'orderEdit' => $orderEdit,
      'dateStart' => $dateStart,
      "seatSisa" => $seatSisa,
      'seatTotal' => $seatTotal,
      "seatSelected" => $seatSelected
    ]);
  }

  public function editJemput($id)
  {
    $jadwal = Layanan::with([
      'schedules' => [
        'kendaraan',
      ],
    ])
      ->whereHas('schedules', function ($query) {
        $query->where('status', '=', 'active');
      })
      ->get();

    $orderEdit = Order::where('id', $id)->with('lokasi', 'schedule', 'user')->first();
    $seatSelected = Seat::where('id_order', $id)->get();

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'jemput',
      'edit' => true,
      'orderId' => $id,
      'jadwalData' => $jadwal,
      'orderEdit' => $orderEdit,
      "seatSelected" => $seatSelected
    ]);
  }

  public function editTujuan($id)
  {
    $jadwal = Layanan::with([
      'schedules' => [
        'kendaraan',
      ],
    ])
      ->whereHas('schedules', function ($query) {
        $query->where('status', '=', 'active');
      })
      ->get();

    $orderEdit = Order::where('id', $id)->with('lokasi', 'schedule', 'user')->first();
    $seatSelected = Seat::where('id_order', $id)->get();

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'tujuan',
      'edit' => true,
      'jadwalData' => $jadwal,
      'orderId' => $id,
      'orderEdit' => $orderEdit,
      "seatSelected" => $seatSelected
    ]);
  }
  public function edit(Order $order)
  {
    return redirect("/order/list/" . $order->id . "/data");
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \App\Http\Requests\UpdateOrderRequest  $request
   * @param  \App\Models\Order  $order
   * @return \Illuminate\Http\Response
   */
  public function update(UpdateOrderRequest $request, Order $order)
  {
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
      'status' => 'string|required'
    ]);

    // dd()

    $total_harga = (Schedule::where('id', $request->jadwal)->first()->layanan->biaya_jasa) * ($request->jumlah_seat);

    $orderUpdate = [
      'id_lokasi' => $order->lokasi->id,
      'id_schedule' => $request->jadwal,
      'id_user' => $order->id_user,
      'nama_penumpang' => $request->nama_penumpang,
      'tanggal_pemberangkatan' => Carbon::parse($request->tanggal_pemberangkatan, 'UTC')->format('Y-m-d'),
      'total_seat' => $request->jumlah_seat,
      'total_harga' => $total_harga,
      'status_pembayaran' => $request->status
    ];

    $orderUpdatedData = Order::where('id', $order->id)->first();
    $orderUpdatedData->update($orderUpdate);

    $lokasiUpdatedData = Lokasi::where('id', $order->lokasi->id)->first();
    $lokasiUpdatedData->update([
      'lat_asal' => $request->latlng_asal["lat"],
      'lng_asal' => $request->latlng_asal["lng"],
      'lat_tujuan' => $request->latlng_tujuan["lat"],
      'lng_tujuan' => $request->latlng_tujuan["lng"],
      'alamat_asal' => $request->alamat_asal,
      'alamat_tujuan' => $request->alamat_tujuan,
      'deskripsi_asal' => $request->deskripsi_asal,
      'deskripsi_tujuan' => $request->deskripsi_tujuan
    ]);

    if (
      $request->status === "confirmed" &&
      ($orderUpdatedData->wasChanged() || $lokasiUpdatedData->wasChanged())
    ) {
      Mail::to($order->user->email)->send(new OrderConfirmed($orderUpdatedData));
    }

    $orderUpdate['type'] = 'info';
    return redirect()
      ->route('order.list')
      ->with('message', $orderUpdate);
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

  public function receivePayment()
  {
    $callback = new CallbackService;

    if ($callback->isSignatureKeyVerified()) {
      $notification = $callback->getNotification();
      $order = $callback->getOrder();

      if ($callback->isSuccess()) {
        Order::where('id', $order->id)->update([
          'status_pembayaran' => 'done',
        ]);
        broadcast(new OrderCreated($order, 'pay'))->toOthers();
      }

      if ($callback->isExpire()) {
        Order::where('id', $order->id)->update([
          'status_pembayaran' => 'failed',
        ]);
      }

      if ($callback->isCancelled()) {
        Order::where('id', $order->id)->update([
          'status_pembayaran' => 'failed',
        ]);
      }

      return response()
        ->json([
          'success' => true,
          'message' => 'Notifikasi berhasil diproses',
        ]);
    } else {
      return response()
        ->json([
          'error' => true,
          'message' => 'Signature key tidak terverifikasi',
        ], 403);
    }
  }
}
