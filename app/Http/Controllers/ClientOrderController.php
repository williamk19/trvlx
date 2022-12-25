<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\Lokasi;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientOrderController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    //
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
      'status_pembayaran' => 'confirmed',
      'total_seat' => $request->jumlah_seat,
      'total_harga' => $total_harga
    ]);

    return redirect()
      ->route('client.dashboard')
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

  public function clientOrder()
  {
    return redirect('/client-order/data');
  }

  public function clientOrderData()
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    return Inertia::render('Client/FormPageOrder', [
      'type' => 'data',
      'layananData' => $layanan
    ]);
  }

  public function clientOrderJemput()
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));

    return Inertia::render('Client/FormPageOrder', [
      'type' => 'jemput',
      'layananData' => $layanan
    ]);
  }

  public function clientOrderTujuan()
  {
    $layanan = Layanan::where('status', 'active')->get()->map(fn ($user) => ([
      "id" => $user->id,
      "kota_asal" => $user->kota_asal,
      "kota_tujuan" => $user->kota_tujuan,
      "biaya_jasa" => $user->biaya_jasa
    ]));
    return Inertia::render('Client/FormPageOrder', [
      'type' => 'tujuan',
      'layananData' => $layanan
    ]);
  }
}
