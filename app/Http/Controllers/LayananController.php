<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LayananController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    return Inertia::render('Admin/Layanan', [
      'layanan' => Layanan::all()
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('Admin/FormPageLayanan');
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
      'kota_asal' => 'required|string|max:255',
      'kota_tujuan' => 'required|string|max:255',
      'biaya_jasa' => 'required|numeric',
    ]);
    
    $createLayanan = Layanan::create([
      'kota_asal' => 'required|string|max:255',
      'kota_tujuan' => 'required|string|max:255',
      'biaya_jasa' => 'required|numeric',
    ]);

    return redirect()
      ->route('kendaraan.index')
      ->with('message', $createLayanan);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Layanan  $layanan
   * @return \Illuminate\Http\Response
   */
  public function show(Layanan $layanan)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Layanan  $layanan
   * @return \Illuminate\Http\Response
   */
  public function edit(Layanan $layanan)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Layanan  $layanan
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Layanan $layanan)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Layanan  $layanan
   * @return \Illuminate\Http\Response
   */
  public function destroy(Layanan $layanan)
  {
    //
  }
}
