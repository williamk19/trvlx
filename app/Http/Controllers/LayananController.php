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
  public function index(Request $request)
  {
    $dataLayanan = Layanan::where('kota_asal', 'like', '%' . $request->search . '%')
      ->orWhere('kota_tujuan', 'like', '%' . $request->search . '%')
      ->paginate(5)
      ->through(function ($item) {
        return [
          'id' => $item->id_layanan,
          'kota_asal' => $item->kota_asal,
          'kota_tujuan' => $item->kota_tujuan,
          'biaya_jasa' => $item->biaya_jasa
        ];
      });

    return Inertia::render('Admin/Layanan', [
      'title' => 'Layanan',
      'query' => $request->search,
      'layanan' => $dataLayanan
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
      'kota_asal' => $request->kota_asal,
      'kota_tujuan' => $request->kota_tujuan,
      'biaya_jasa' => $request->biaya_jasa,
    ]);

    return redirect()
      ->route('layanan.index')
      ->with(
        'message',
        $createLayanan->kota_asal . " - " . $createLayanan->kota_tujuan . " Telah dibuat"
      );
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
    return Inertia::render('Admin/FormPageLayanan', [
      'layanan' => $layanan
    ]);
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
    $request->validate([
      'kota_asal' => 'required|string|max:255',
      'kota_tujuan' => 'required|string|max:255',
      'biaya_jasa' => 'required|numeric',
    ]);

    Layanan::where('id_layanan', $layanan->id)
      ->first()
      ->update([
        'kota_asal' => $request->kota_asal,
        'kota_tujuan' => $request->kota_tujuan,
        'biaya_jasa' => $request->biaya_jasa
      ]);

    return redirect()
      ->route('layanan.index')
      ->with(
        'message',
        $request->kota_asal . " - " . $request->kota_tujuan . " Telah diubah"
      );
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Layanan  $layanan
   * @return \Illuminate\Http\Response
   */
  public function destroy(Layanan $layanan)
  {
    $deletedLayanan = clone $layanan;
    Layanan::destroy($layanan->id_layanan);
    $deletedLayanan->type = "error";
    return redirect()
      ->route('layanan.index')
      ->with(
        'message',
        $deletedLayanan->kota_asal . " - " . $deletedLayanan->kota_tujuan . " Telah Dihapus"
      );
  }
}
