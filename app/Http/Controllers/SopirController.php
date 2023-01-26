<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class SopirController extends Controller
{
  public function keberangkatan(Request $request)
  {
    DB::statement("SET SQL_MODE=''");
    if ($request->tanggalPemberangkatan) {
      $dateStart = Carbon::parse($request->tanggalPemberangkatan)->toDateString();
    } else {
      $dateStart = Carbon::now()->toDateString();
    }
    $dateEnd = Carbon::now()->addWeek()->toDateString();

    $dataLayananSopir = Order::with('layanan')
      ->where('status_pembayaran', 'confirmed')
      ->whereBetween('tanggal_pemberangkatan', [$dateStart, $dateEnd])
      ->groupBy('id_layanan', 'tanggal_pemberangkatan')
      ->get();

    return Inertia::render('Sopir/Dashboard', [
      'dataLayananSopir' => $dataLayananSopir,
      'date' => $dateStart
    ]);
  }

  public function detail(Request $request)
  {

    $idRole = auth()->user();
    $tanggalPemberangkatan = $request->tanggalPemberangkatan;
    $idLayanan = $request->idLayanan;
    if (!$tanggalPemberangkatan || !$idLayanan) {
      abort(404);
    }

    $layanan = Layanan::where('id', $idLayanan)->first();

    $order = Order::with('layanan', 'user', 'lokasi')
      ->where('tanggal_pemberangkatan', $tanggalPemberangkatan)
      ->where('id_layanan', $idLayanan)
      ->get();

    return Inertia::render('Sopir/AntarDetail', [
      'order' => $order,
      'tanggalPemberangkatan' => $tanggalPemberangkatan,
      'layanan' => $layanan
    ]);
  }

  public function antar(Request $request)
  {
    $tanggalPemberangkatan = $request->tanggalPemberangkatan;
    $idLayanan = $request->idLayanan;
    if (!$tanggalPemberangkatan || !$idLayanan) {
      abort(404);
    }

    $layanan = Layanan::where('id', $idLayanan)->first();

    $order = Order::with('layanan', 'user', 'lokasi')
      ->where('tanggal_pemberangkatan', $tanggalPemberangkatan)
      ->where('id_layanan', $idLayanan)
      ->get();

    return Inertia::render('Sopir/AntarMap', [
      'order' => $order,
      'tanggalPemberangkatan' => $tanggalPemberangkatan,
      'layanan' => $layanan
    ]);
  }

  public function jemput(Request $request)
  {
    $tanggalPemberangkatan = $request->tanggalPemberangkatan;
    $idLayanan = $request->idLayanan;
    if (!$tanggalPemberangkatan || !$idLayanan) {
      abort(404);
    }

    $layanan = Layanan::where('id', $idLayanan)->first();

    $order = Order::with('layanan', 'user', 'lokasi')
      ->where('tanggal_pemberangkatan', $tanggalPemberangkatan)
      ->where('id_layanan', $idLayanan)
      ->get();

    return Inertia::render('Sopir/JemputMap', [
      'order' => $order,
      'tanggalPemberangkatan' => $tanggalPemberangkatan,
      'layanan' => $layanan
    ]);
  }
}
