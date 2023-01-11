<?php

namespace App\Http\Controllers;

use App\Models\Kendaraan;
use App\Models\Layanan;
use App\Models\Order;
use App\Models\User;
use App\Services\Midtrans\CreateSnapTokenService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function filter()
  {

    $idRole = strval(auth()->user()->id_kategori);
    if ($idRole === '1' || $idRole === '2') {
      return redirect('/admin/dashboard');
    } else if ($idRole === '3') {
      return redirect('/sopir/dashboard');
    } else if ($idRole === '4') {
      return redirect('/client/dashboard');
    }

    return redirect('/client/dashboard');
  }

  public function admin()
  {
    $orderCount = Order::all()->count();
    $orderDoneCount = Order::where(function ($query) {
      $query
        ->where('status_pembayaran', 'pending')
        ->orWhere('status_pembayaran', 'done');
    })->count();
    $layananCount = Layanan::all()->count();
    $kendaraanCount = Kendaraan::all()->count();
    $lastDoneOrder = Order::where(function ($query) {
      $query
        ->where('status_pembayaran', 'pending')
        ->orWhere('status_pembayaran', 'done');
    })
      ->orderBy('created_at', 'DESC')
      ->limit(5)
      ->get()->map(fn ($order) => ([
        'nama_penumpang' => $order->nama_penumpang,
        'id_payment' => $order->id_payment,
        'layanan' => $order->layanan->kota_asal . " - " . $order->layanan->kota_tujuan,
        'status_pembayaran' => $order->status_pembayaran,
        'tanggal_pemberangkatan' => $order->tanggal_pemberangkatan
      ]));

    return Inertia::render('Admin/Dashboard', [
      'orderCount' => $orderCount,
      'layananCount' => $layananCount,
      'kendaraanCount' => $kendaraanCount,
      'lastDoneOrder' => $lastDoneOrder,
      'orderDoneCount' => $orderDoneCount
    ]);
  }

  public function client()
  {
    $order = Order::where('id_user', auth()->user()->id)
      ->orderBy('created_at', 'desc')
      ->paginate(6)
      ->through(
        fn ($item) =>
        [
          'id' => $item->id,
          'nama_penumpang' => $item->nama_penumpang,
          'tanggal_pemberangkatan' => $item->tanggal_pemberangkatan,
          'status_pembayaran' => $item->status_pembayaran,
          'layanan' => $item->layanan
        ]
      );;

    return Inertia::render('Client/Dashboard', [
      'orderList' => $order
    ]);
  }

  public function sopir(Request $request)
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
      ->whereHas('layanan', function ($query) {
        $query->where('id_sopir', '=', auth()->user()->id);
      })
      ->groupBy('id_layanan', 'tanggal_pemberangkatan')
      ->get();
    
    return Inertia::render('Sopir/Dashboard', [
      'dataLayananSopir' => $dataLayananSopir,
      'date' => $dateStart
    ]);
  }

  public function settings()
  {
    $user = User::where('id', auth()->user()->id)->first();

    return Inertia::render('Settings', [
      'itemUser' => $user,
    ]);
  }
}
