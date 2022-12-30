<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Layanan;
use App\Models\Lokasi;
use App\Models\User;
use App\Services\Midtrans\CallbackService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

  public function orderData()
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'data',
      'layananData' => $layanan
    ]);
  }

  public function orderJemput()
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'jemput',
      'layananData' => $layanan
    ]);
  }

  public function orderTujuan()
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'tujuan',
      'layananData' => $layanan
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
      ->paginate(5)
      ->through(
        fn ($item) =>
        [
          'id' => $item->id,
          'nama_penumpang' => $item->nama_penumpang,
          'tanggal_pemberangkatan' => $item->tanggal_pemberangkatan,
          'status_pembayaran' => $item->status_pembayaran,
          'layanan' => $item->layanan
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
      'id_user' => 10,
      'nama_penumpang' => $request->nama_penumpang,
      'tanggal_pemberangkatan' => Carbon::parse($request->tanggal_pemberangkatan, 'UTC')->format('Y-m-d'),
      'status_pembayaran' => 'confirmed',
      'total_seat' => $request->jumlah_seat,
      'total_harga' => $total_harga
    ]);

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

  public function editData($id)
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    $orderEdit = Order::where('id', $id)->first();
    $orderEdit->lokasi;
    $orderEdit->layanan;

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'data',
      'edit' => true,
      'orderId' => $id,
      'layananData' => $layanan,
      'orderEdit' => $orderEdit
    ]);
  }

  public function editJemput($id)
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    $orderEdit = Order::where('id', $id)->first();
    $orderEdit->lokasi;
    $orderEdit->layanan;

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'jemput',
      'edit' => true,
      'orderId' => $id,
      'layananData' => $layanan,
      'orderEdit' => $orderEdit
    ]);
  }

  public function editTujuan($id)
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    $orderEdit = Order::where('id', $id)->first();
    $orderEdit->lokasi;
    $orderEdit->layanan;

    return Inertia::render('Admin/FormPageOrder', [
      'type' => 'tujuan',
      'edit' => true,
      'layananData' => $layanan,
      'orderId' => $id,
      'orderEdit' => $orderEdit
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
      'layanan' => 'required|numeric',
      'latlng_asal' => 'required',
      'latlng_tujuan' => 'required',
      'alamat_asal' => 'required|string|max:255',
      'alamat_tujuan' => 'required|string|max:255',
      'deskripsi_asal' => 'string|nullable',
      'deskripsi_tujuan' => 'string|nullable'
    ]);

    $total_harga = (Layanan::where('id', $request->layanan)->first('biaya_jasa')->biaya_jasa) * ($request->jumlah_seat);
    $orderUpdate = [
      'id_lokasi' => $order->lokasi->id,
      'id_layanan' => $request->layanan,
      'id_user' => 10,
      'nama_penumpang' => $request->nama_penumpang,
      'tanggal_pemberangkatan' => Carbon::tomorrow(),
      'status_pembayaran' => 'confirmed',
      'total_seat' => $request->jumlah_seat,
      'total_harga' => $total_harga
    ];
    Order::where('id', $order->id)->first()
      ->update($orderUpdate);

    Lokasi::where('id', $order->lokasi->id)->first()
      ->update([
        'lat_asal' => $request->latlng_asal["lat"],
        'lng_asal' => $request->latlng_asal["lng"],
        'lat_tujuan' => $request->latlng_tujuan["lat"],
        'lng_tujuan' => $request->latlng_tujuan["lng"],
        'alamat_asal' => $request->alamat_asal,
        'alamat_tujuan' => $request->alamat_tujuan,
        'deskripsi_asal' => $request->deskripsi_asal,
        'deskripsi_tujuan' => $request->deskripsi_tujuan
      ]);

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
