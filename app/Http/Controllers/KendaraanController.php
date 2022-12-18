<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule as ValidationRule;

class KendaraanController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $dataKendaraan = Kendaraan::where('merk_mobil', 'like', '%' . $request->search . '%')
      ->orWhere('nama_mobil', 'like', '%' . $request->search . '%')
      ->paginate(5)
      ->through(fn($item) =>
        [
          'id' => $item->id_kendaraan,
          'plat_nomor' => $item->plat_nomor,
          'merk_mobil' => $item->merk_mobil,
          'nama_mobil' => $item->nama_mobil,
          'jumlah_seat' => $item->jumlah_seat
        ]
      );

    return Inertia::render('Admin/Kendaraan', [
      'title' => 'Kendaraan',
      'query' => $request->search,
      'kendaraan' => $dataKendaraan
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('Admin/FormPageKendaraan');
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
    $itemKendaraan = Kendaraan::where('id_kendaraan', $kendaraan->id_kendaraan)->first();
    return Inertia::render('Admin/FormPageKendaraan', [
      'itemKendaraan' => $itemKendaraan
    ]);
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
    $request->validate([
      'nama_mobil' => 'required|string|max:255',
      'merk_mobil' => 'required|string|max:255',
      'jumlah_seat' => 'required|string',
      'plat_nomor' => [
        'required',
        'string',
        'max:255',
        ValidationRule::unique('kendaraan', 'plat_nomor')->ignore($kendaraan->id_kendaraan, 'id_kendaraan')
      ]
    ]);

    $updateKendaraan = [
      'nama_mobil' => $request->nama_mobil,
      'merk_mobil' => $request->merk_mobil,
      'plat_nomor' => $request->plat_nomor,
      'jumlah_seat' => $request->jumlah_seat
    ];

    Kendaraan::where('id_kendaraan', $kendaraan->id_kendaraan)
      ->first()
      ->update($updateKendaraan);

    $updateKendaraan['type'] = 'info';
    return redirect()
      ->route('kendaraan.index')
      ->with('message', $updateKendaraan);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Kendaraan  $kendaraan
   * @return \Illuminate\Http\Response
   */
  public function destroy(Kendaraan $kendaraan)
  {
    $deletedKendaraan = clone $kendaraan;
    $deletedKendaraan->type = "error";
    $itemKendaraan = Kendaraan::where('id_kendaraan', $kendaraan->id_kendaraan)->first()->delete();
    return redirect()
      ->route('kendaraan.index')
      ->with('message', $deletedKendaraan);
  }
}
