<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Validation\Rule as ValidationRule;

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

  public function admin(Request $request)
  {
    $adminData = User::where('id_kategori', 1)
      ->orWhere('id_kategori', 2)
      ->where('nama_user', 'like', '%' . $request->search . '%')
      ->paginate(5)
      ->through(function ($item) {
        return [
          'id' => $item->id,
          'nama_user' => $item->nama_user,
          'email_user' => $item->email_user,
          'telepon_user' => $item->telepon_user
        ];
      });
    return Inertia::render('Admin/PenggunaDataPage', [
      'title' => 'Data Admin',
      'query' => $request->search,
      'user' => $adminData
    ]);
  }

  public function sopir(Request $request)
  {
    $sopirData = User::where('id_kategori', 3)
    ->where('nama_user', 'like', '%' . $request->search . '%')
      ->paginate(5)
      ->through(function ($item) {
        return [
          'id' => $item->id,
          'nama_user' => $item->nama_user,
          'email_user' => $item->email_user,
          'telepon_user' => $item->telepon_user
        ];
      });

    return Inertia::render('Admin/PenggunaDataPage', [
      'title' => 'Data Sopir',
      'query' => $request->search,
      'user' => $sopirData
    ]);
  }

  public function pengguna(Request $request)
  {
    $penggunaData = User::where('id_kategori', 4)
      ->where('nama_user', 'like', '%'.$request->search.'%')
      ->paginate(5)
      ->through(function ($item) {
        return [
          'id' => $item->id,
          'nama_user' => $item->nama_user,
          'email_user' => $item->email_user,
          'telepon_user' => $item->telepon_user
        ];
      });

    return Inertia::render('Admin/PenggunaDataPage', [
      'title' => 'Data Pengguna',
      'query' => $request->search,
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

  public function adminEdit(User $user)
  {
    $itemUser = User::where('id', $user->id)->first();
    return Inertia::render('Admin/FormPageUser', [
      'itemUser' => $itemUser
    ]);
  }

  public function sopirEdit(User $user)
  {
    $itemUser = User::where('id', $user->id)->first();
    return Inertia::render('Admin/FormPageUser', [
      'itemUser' => $itemUser
    ]);
  }

  public function penggunaEdit(User $user)
  {
    $itemUser = User::where('id', $user->id)->first();
    return Inertia::render('Admin/FormPageUser', [
      'itemUser' => $itemUser
    ]);
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
    $request->validate([
      'nama_user' => 'required|string|max:255',
      'email_user' => [
        'required',
        'string',
        'max:255',
        ValidationRule::unique('users', 'email_user')->ignore($user->id)
      ],
      'telepon_user' => [
        'required',
        'string',
        'max:255',
        ValidationRule::unique('users', 'telepon_user')->ignore($user->id)
      ]
    ]);

    $updateUser = [
      'nama_user' => $request->nama_user,
      'email_user' => $request->email_user,
      'telepon_user' => $request->telepon_user,
      'id_kategori' => $request->id_kategori
    ];

    User::where('id', $user->id)
      ->first()
      ->update($updateUser);

    $updateUser['type'] = 'info';
    $userObject = (object) $updateUser;
    $category = $this->getCategory($user->id_kategori);
    return redirect()
      ->route("user.$category")
      ->with('message', "$userObject->nama_user telah diubah");
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\User  $user
   * @return \Illuminate\Http\Response
   */
  public function destroy(User $user)
  {
    if ($user->id == Auth::id()) {
      return redirect()
        ->route('user.index')
        ->with('message', 'Akun sedang dipakai saat ini');
    }



    $deletedUser = clone $user;
    $deletedUser->type = "error";
    User::where('id', $user->id)->first()->delete();

    $category = $this->getCategory($user->id_kategori);
    return redirect()
      ->route("user.$category")
      ->with('message', $deletedUser);
  }

  public function getCategory($categoryId)
  {
    switch ($categoryId) {
      case '1':
        return 'admin';
      case '2':
        return 'admin';
      case '3':
        return 'sopir';
      case '4':
        return 'pengguna';
      default:
        return 'index';
    }
  }
}
