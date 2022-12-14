<?php

use App\Http\Controllers\KendaraanController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
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

Route::group(['middleware' => ['auth', 'verified']], function () {
  Route::group(['middleware' => ['role:1,2,3,4']], function() {
    Route::get('/dashboard', function () {
      return Inertia::render('Dashboard');
    })->name('dashboard');
  });

  Route::group(['middleware' => ['role:1,2']], function () {
    Route::resource('kendaraan', KendaraanController::class);

    Route::resource('layanan', LayananController::class);

    Route::controller(UserController::class)->group(function() {
      Route::get('/user/admin', 'admin')->name('user.admin');
      Route::get('/user/sopir', 'sopir')->name('user.sopir');
      Route::get('/user/pengguna', 'pengguna')->name('user.pengguna');
      Route::get('/user/admin/{user}/edit', 'adminEdit')->name('user.adminEdit');
      Route::get('/user/sopir/{user}/edit', 'sopirEdit')->name('user.sopirEdit');
      Route::get('/user/pengguna/{user}/edit', 'penggunaEdit')->name('user.penggunaEdit');
    });
    Route::resource('user', UserController::class);

    Route::controller(OrderController::class)->group(function() {
      Route::get('/order/list', 'orderList')->name('order.list');
      Route::get('/order/data', 'orderData')->name('order.data');
      Route::get('/order/jemput', 'orderJemput')->name('order.jemput');
      Route::get('/order/tujuan', 'orderTujuan')->name('order.tujuan');
    });
    Route::resource('order', OrderController::class);
  });
});

require __DIR__ . '/auth.php';
