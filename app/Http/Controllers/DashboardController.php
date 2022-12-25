<?php

namespace App\Http\Controllers;

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
    return Inertia::render('Client/Dashboard');
  }
}
