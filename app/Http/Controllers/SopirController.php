<?php

namespace App\Http\Controllers;

use App\Models\Layanan;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SopirController extends Controller
{
  public function detail(Request $request)
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
