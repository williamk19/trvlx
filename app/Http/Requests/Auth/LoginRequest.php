<?php

namespace App\Http\Requests\Auth;

use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'email_user' => ['required', 'string', 'email'],
      'password' => ['required', 'string'],
    ];
  }

  /**
   * Attempt to authenticate the request's credentials.
   *
   * @return void
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function authenticate()
  {
    $this->ensureIsNotRateLimited();
    $user_credential = [
      'email_user' => $this->email_user,
      'password' => $this->password
    ];

    // dd($user_credential);
    // Debugbar::info("Test");
    // dd(Auth::attempt($user_credential), $user_credential);

    if (!Auth::attempt($user_credential/*, $this->boolean('remember')*/)) {
      RateLimiter::hit($this->throttleKey());

      throw ValidationException::withMessages([
        'email_user' => trans('auth.failed'),
      ]);
    }    

    RateLimiter::clear($this->throttleKey());
  }

  /**
   * Ensure the login request is not rate limited.
   *
   * @return void
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function ensureIsNotRateLimited()
  {
    if (!RateLimiter::tooManyAttempts($this->throttleKey(), 10)) {
      return;
    }

    event(new Lockout($this));

    $seconds = RateLimiter::availableIn($this->throttleKey());

    throw ValidationException::withMessages([
      'email_user' => trans('auth.throttle', [
        'seconds' => $seconds,
        'minutes' => ceil($seconds / 60),
      ]),
    ]);
  }

  /**
   * Get the rate limiting throttle key for the request.
   *
   * @return string
   */
  public function throttleKey()
  {
    return Str::transliterate(Str::lower($this->input('email_user')) . '|' . $this->ip());
  }
}
