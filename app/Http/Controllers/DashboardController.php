<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Services\Midtrans\CreateSnapTokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
  public function filter() {
    
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

  public function admin() {
    return Inertia::render('Admin/Dashboard');
  }

  public function client() {
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

  public function settings() {
    $user = User::where('id', auth()->user()->id)->first();

    return Inertia::render('Settings', [
      'itemUser' => $user,
    ]);
  }
}
