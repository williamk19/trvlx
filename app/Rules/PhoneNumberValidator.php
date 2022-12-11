<?php

namespace App\Rules;

use App\Models\User;
use Illuminate\Contracts\Validation\InvokableRule;

class PhoneNumberValidator implements InvokableRule
{
  /**
   * Run the validation rule.
   *
   * @param  string  $attribute
   * @param  mixed  $value
   * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
   * @return void
   */
  public function __invoke($attribute, $value, $fail)
  {
    $nomor_telepon = "+62" . $value;
    $userExists = User::where($attribute, $nomor_telepon)->first();

    if ($userExists) {
      $fail('Nomor anda telah terdaftar');
    }
  }
}
