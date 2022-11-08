<?php

use App\Http\Controllers\KendaraanController;
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
  Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
  })->name('admin.dashboard');

  // Kendaraan
  Route::resource('kendaraan', KendaraanController::class);

  // User
  Route::get('/user/admin', [UserController::class, 'admin'])->name('user.admin');
  Route::get('/user/sopir', [UserController::class, 'sopir'])->name('user.sopir');
  Route::get('/user/pengguna', [UserController::class, 'pengguna'])->name('user.pengguna');
  Route::resource('user', UserController::class);
});

require __DIR__ . '/auth.php';
