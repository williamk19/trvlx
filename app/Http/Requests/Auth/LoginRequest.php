<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

    if (!Auth::attempt($user_credential, $this->boolean('remember'))) {
      RateLimiter::hit($this->throttleKey());

      if (User::where('email_user', $user_credential['email_user'])->first()) {
        $user = User::where('email_user', $user_credential['email_user'])->first();

        if (!Hash::check($user_credential['password'], $user->password)) {
          throw ValidationException::withMessages([
            'password' => trans('auth.password'),
          ]);
        } else {
          throw ValidationException::withMessages([
            'email_user' => trans('auth.failed'),
          ]);
        }
      }

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
    if (!RateLimiter::tooManyAttempts($this->throttleKey(), 15)) {
      return;
    }

    event(new Lockout($this));

    $seconds = RateLimiter::availableIn($this->throttleKey());

    throw ValidationException::withMessages([
      'email_user' => trans('auth.throttle', [
        'seconds' => $seconds,
        'minutes' => ceil($seconds / 60),
      ]),
      'seconds' => $seconds
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
