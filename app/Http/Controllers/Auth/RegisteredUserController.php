<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Barryvdh\Debugbar\Facades\Debugbar;

class RegisteredUserController extends Controller
{
  /**
   * Display the registration view.
   *
   * @return \Inertia\Response
   */
  public function create()
  {
    return Inertia::render('Auth/Register');
  }

  /**
   * Handle an incoming registration request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\RedirectResponse
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request)
  {
    $request->validate([
      'nama_user' => 'required|string|max:255',
      'email_user' => 'required|string|email|max:255|unique:users',
      'telepon_user' => 'required|string|regex:/^([0-9\s\-\+\(\)]*)$/|min:10|max:255|unique:users',
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
      'nama_user' => $request->nama_user,
      'id_kategori' => 4,
      'email_user' => $request->email_user,
      'telepon_user' => $request->telepon_user,
      'password' => Hash::make($request->password_user),
    ]);

    event(new Registered($user));

    Auth::login($user);

    return redirect(RouteServiceProvider::HOME);
  }
}
