<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Rules\PhoneNumberValidator;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

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
      'email' => 'required|string|email|max:255|unique:users',
      'telepon_user' => ['required', 'string', new PhoneNumberValidator, 'min:10', 'max:17'],
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = User::create([
      'nama_user' => ucwords($request->nama_user),
      'id_kategori' => 4,
      'email' => $request->email,
      'telepon_user' => "+62" . $request->telepon_user,
      'password' => Hash::make($request->password),
    ]);

    event(new Registered($user));

    Auth::login($user);

    return redirect("/");
  }
}
