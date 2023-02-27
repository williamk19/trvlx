<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Layanan;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $dataJadwal = Layanan::with([
      'schedules' => [
        'sopir',
        'kendaraan',
      ],
    ])->where('kota_asal', 'like', '%' . $request->search . '%')
      ->orWhere('kota_tujuan', 'like', '%' . $request->search . '%')
      ->paginate(5);

    return Inertia::render('Admin/Jadwal', [
      'title' => 'Jadwal',
      'query' => $request->search,
      'jadwal' => $dataJadwal
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $listSopir = User::where('id_kategori', 3)->get()->map(
      fn ($item) =>
      [
        'value' => $item->id,
        'label' => $item->nama_user,
        'name' => 'id_sopir'
      ]
    );

    $listKendaraan = Kendaraan::all()->map(
      fn ($item) => [
        'value' => $item->id,
        'label' => $item->merk_mobil . ", " . $item->nama_mobil . " (" . $item->plat_nomor . ")",
        'name' => 'id_kendaraan'
      ]
    );

    $listLayanan = Layanan::all()->map(
      fn ($item) => [
        'value' => $item->id,
        'label' => $item->kota_asal . " - " . $item->kota_tujuan,
        'name' => 'id_layanan'
      ]
    );

    return Inertia::render('Admin/FormPageJadwal', [
      'listSopir' => $listSopir,
      'listKendaraan' => $listKendaraan,
      'listLayanan' => $listLayanan
    ]);
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
      'id_layanan' => 'required|numeric',
      'id_sopir' => 'required|numeric',
      'id_kendaraan' => 'required|numeric',
      'waktu' => 'required',
      'status' => 'required|in:active,disabled'
    ]);

    $createSchedule = Schedule::create([
      'id_layanan' => $request->id_layanan,
      'id_sopir' => $request->id_sopir,
      'id_kendaraan' => $request->id_kendaraan,
      'status' => $request->status,
      'waktu' => $request->waktu
    ]);

    return redirect()
      ->route('jadwal.index')
      ->with('message', $createSchedule);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show(Schedule $schedule)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit(Schedule $schedule)
  {
    $listSopir = User::where('id_kategori', 3)->get()->map(
      fn ($item) =>
      [
        'value' => $item->id,
        'label' => $item->nama_user,
        'name' => 'id_sopir'
      ]
    );

    $listKendaraan = Kendaraan::all()->map(
      fn ($item) => [
        'value' => $item->id,
        'label' => $item->merk_mobil . ", " . $item->nama_mobil . " (" . $item->plat_nomor . ")",
        'name' => 'id_kendaraan'
      ]
    );

    $listLayanan = Layanan::all()->map(
      fn ($item) => [
        'value' => $item->id,
        'label' => $item->kota_asal . " - " . $item->kota_tujuan,
        'name' => 'id_layanan'
      ]
    );

    dd($schedule);

    return Inertia::render('Admin/FormPageJadwal', [
      'jadwal' => $schedule,
      'listSopir' => $listSopir,
      'listKendaraan' => $listKendaraan,
      'listLayanan' => $listLayanan
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Schedule $schedule)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Schedule $schedule)
  {
    //
  }
}
