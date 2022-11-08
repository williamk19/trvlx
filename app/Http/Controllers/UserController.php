<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $totalAdmin = User::where('id_kategori', 1)->orWhere('id_kategori', 2)->count();
    $totalSopir = User::where('id_kategori', 3)->count();
    $totalPengguna = User::where('id_kategori', 4)->count();

    return Inertia::render('Admin/Pengguna', [
      'totalSopir' => $totalSopir,
      'totalAdmin' => $totalAdmin,
      'totalPengguna' => $totalPengguna
    ]);
  }

  public function admin() {
    $adminData = User::where('id_kategori', 1)->orWhere('id_kategori', 2)->get();
    return Inertia::render('Admin/PenggunaDataPage', [
      'title' => 'Data Admin',
      'user' => $adminData
    ]);
  }

  public function sopir() {
    $sopirData = User::where('id_kategori', 3)->get();
    return Inertia::render('Admin/PenggunaDataPage', [
      'title' => 'Data Sopir',
      'user' => $sopirData
    ]);
  }

  public function pengguna() {
    $penggunaData = User::where('id_kategori', 4)->get();
    return Inertia::render('Admin/PenggunaDataPage', [
      'title' => 'Data Pengguna',
      'user' => $penggunaData
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function show(User $user)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function edit(User $user)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, User $user)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function destroy(User $user)
  {
    //
  }
}
