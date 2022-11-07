<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;

class KendaraanController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('Admin/Kendaraan', [
      'kendaraan' => Kendaraan::all()
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('Admin/AddKendaraan');
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
      'nama_mobil' => 'required|string|max:255',
      'merk_mobil' => 'required|string|max:255',
      'plat_nomor' => 'required|unique:kendaraan|string|max:255',
      'jumlah_seat' => 'required|string',
    ]);

    $createKendaraan = Kendaraan::create([
      'nama_mobil' => $request->nama_mobil,
      'merk_mobil' => $request->merk_mobil,
      'plat_nomor' => $request->plat_nomor,
      'jumlah_seat' => $request->jumlah_seat,
      'created_at' => Carbon::now()->setTimezone('Asia/Jakarta')->toDateTimeString()
    ]);

    return redirect()
      ->route('kendaraan.index')
      ->with('message', $createKendaraan);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Kendaraan  $kendaraan
   * @return \Illuminate\Http\Response
   */
  public function show(Kendaraan $kendaraan)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Kendaraan  $kendaraan
   * @return \Illuminate\Http\Response
   */
  public function edit(Kendaraan $kendaraan)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Kendaraan  $kendaraan
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Kendaraan $kendaraan)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Kendaraan  $kendaraan
   * @return \Illuminate\Http\Response
   */
  public function destroy(Kendaraan $kendaraan)
  {
    //
  }
}
