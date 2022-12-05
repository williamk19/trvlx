<?php

use App\Http\Controllers\KendaraanController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

Route::middleware(['auth', 'verified', 'role:1,2'])->group(function () {
  //=====================================================================================
  // Laravel Routing

  Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
  })->name('admin.dashboard');

  // Kendaraan
  Route::resource('kendaraan', KendaraanController::class);

  // User
  Route::get('/user/admin', [UserController::class, 'admin'])->name('user.admin');
  Route::get('/user/sopir', [UserController::class, 'sopir'])->name('user.sopir');
  Route::get('/user/pengguna', [UserController::class, 'pengguna'])->name('user.pengguna');
  Route::get('/user/admin/{user}/edit', [UserController::class, 'adminEdit'])
    ->name('user.adminEdit');
  Route::get('/user/sopir/{user}/edit', [UserController::class, 'sopirEdit'])
    ->name('user.sopirEdit');
  Route::get('/user/pengguna/{user}/edit', [UserController::class, 'penggunaEdit'])
    ->name('user.penggunaEdit');
  Route::resource('user', UserController::class);

  // Layanan
  Route::resource('layanan', LayananController::class);

  // Order Travel
  Route::get('/order/list', [OrderController::class, 'orderList'])->name('order.list');
  Route::inertia('/order/data', 'Admin/FormPageOrder', ['type' => 'data']);
  Route::inertia('/order/jemput', 'Admin/FormPageOrder', ['type' => 'jemput']);
  Route::inertia('/order/tujuan', 'Admin/FormPageOrder', ['type' => 'tujuan']);
  Route::resource('order', OrderController::class);
});

require __DIR__ . '/auth.php';
