<?php

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

Route::get('/dashboard', function () {
  return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified', 'role:1,2'])->name('admin.dashboard');

Route::get('/kendaraan', function () {
  return Inertia::render('Admin/Kendaraan');
})->middleware(['auth', 'verified', 'role:1,2'])->name('admin.kendaraan');

require __DIR__ . '/auth.php';