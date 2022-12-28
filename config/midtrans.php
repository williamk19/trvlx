<?php

return [
  'merchant_id' => env('PAYMENT_MERCHANT_ID'),
  'client_key' => env('PAYMENT_CLIENT_KEY'),
  'server_key' => env('PAYMENT_SERVER_KEY'),

  'is_production' => env('PAYMENT_IS_PRODUCTION', false),
  'is_sanitized' => false,
  'is_3ds' => false
];