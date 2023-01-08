<?php

use App\Http\Controllers\ClientOrderController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KendaraanController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SopirController;
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

Route::post('/order/payment', [OrderController::class, 'receivePayment'])->name('order.payment');

Route::group(['middleware' => ['auth', 'verified']], function () {
  Route::group(['middleware' => ['role:1,2,3,4']], function () {
    Route::get('/dashboard', [DashboardController::class, 'filter'])->name('dashboard');
    Route::get('/account/settings', [DashboardController::class, 'settings'])->name('account.settings');
    Route::put('/account/{user}', [UserController::class, 'update'])->name('account.update');
  });

  Route::group(['middleware' => ['role:1,2']], function () {
    Route::get('/admin/dashboard', [DashboardController::class, 'admin'])->name('admin.dashboard');

    Route::resource('kendaraan', KendaraanController::class);

    Route::resource('layanan', LayananController::class);

    Route::controller(UserController::class)->group(function () {
      Route::get('/user/admin', 'admin')->name('user.admin');
      Route::get('/user/sopir', 'sopir')->name('user.sopir');
      Route::get('/user/pengguna', 'pengguna')->name('user.pengguna');
      Route::get('/user/admin/{user}/edit', 'adminEdit')->name('user.adminEdit');
      Route::get('/user/sopir/{user}/edit', 'sopirEdit')->name('user.sopirEdit');
      Route::get('/user/pengguna/{user}/edit', 'penggunaEdit')->name('user.penggunaEdit');
    });
    Route::resource('user', UserController::class);

    Route::controller(OrderController::class)->group(function () {
      Route::get('/order/list', 'orderList')->name('order.list');
      Route::get('/order/data', 'orderData')->name('order.data');
      Route::get('/order/jemput', 'orderJemput')->name('order.jemput');
      Route::get('/order/tujuan', 'orderTujuan')->name('order.tujuan');
      Route::get('/order/list/{id}/data', 'editData')->name('edit.data');
      Route::get('/order/list/{id}/jemput', 'editJemput')->name('edit.jemput');
      Route::get('/order/list/{id}/tujuan', 'editTujuan')->name('edit.tujuan');
    });
    Route::resource('order', OrderController::class);
  });

  Route::group(['middleware' => ['role:3']], function () {
    Route::get('/sopir/dashboard', [DashboardController::class, 'sopir'])->name('sopir.dashboard');
    Route::get('/detail/', [SopirController::class, 'detail'])->name('sopir.detail');
    Route::get('/jemput/', [SopirController::class, 'jemput'])->name('sopir.jemput');
    Route::get('/antar/', [SopirController::class, 'antar'])->name('sopir.antar');
  });

  Route::group(['middleware' => ['role:4']], function () {
    Route::get('/client/dashboard', [DashboardController::class, 'client'])->name('client.dashboard');

    Route::controller(ClientOrderController::class)->group(function () {
      Route::get('/client-order/data', 'clientOrderData')->name('client-order.data');
      Route::get('/client-order/jemput', 'clientOrderJemput')->name('client-order.jemput');
      Route::get('/client-order/tujuan', 'clientOrderTujuan')->name('client-order.tujuan');
      Route::get('/client-order/payment/{id}', 'clientPayment')->name('client-order.payment');
    });
    Route::resource('client-order', ClientOrderController::class);
  });
});

require __DIR__ . '/auth.php';
