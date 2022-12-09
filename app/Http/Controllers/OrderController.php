<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Layanan;
use App\Models\Lokasi;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

use function PHPSTORM_META\type;

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
    $layanan = Layanan::all()->map(fn ($user) => ([
      "id_layanan" => $user->id_layanan,
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
    return Inertia::render('Admin/FormPageOrder', ['type' => 'jemput']);
  }

  public function orderTujuan()
  {
    return Inertia::render('Admin/FormPageOrder', ['type' => 'tujuan']);
  }

  public function orderList()
  {
    dd("H3h3");
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
      'latlng_jemput' => 'required',
      'latlng_tujuan' => 'required',
      'alamat_jemput' => 'required|string|max:255',
      'alamat_tujuan' => 'required|string|max:255',
      'deskripsi_jemput' => 'string|nullable',
      'deskripsi_tujuan' => 'string|nullable'
    ]);

    $lokasi = Lokasi::create([
      'lat_lng_asal' => DB::raw('Point(' . $request->latlng_jemput["lat"] . ',' . $request->latlng_jemput["lng"] . ')'),
      'lat_lng_tujuan' => DB::raw('Point(' . $request->latlng_tujuan["lat"] . ',' . $request->latlng_tujuan["lng"] . ')'),
      'alamat_asal' => $request->alamat_jemput,
      'alamat_tujuan' => $request->alamat_tujuan,
      'deskripsi_asal' => $request->deskripsi_jemput,
      'deskripsi_tujuan' => $request->deskripsi_tujuan
    ]);

    $order = Order::create([
      'id_lokasi' => ''
    ]);

    dd($lokasi);
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
  public function edit(Order $order)
  {
    //
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
}
