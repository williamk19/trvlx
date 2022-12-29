<?php

namespace App\Services\Midtrans;

use Midtrans\Snap;

class CreateSnapTokenService extends Midtrans
{
  protected $order;

  public function __construct()
  {
    parent::__construct();
  }

  public function getSnapToken($orderDetails)
  {
    $snapToken = Snap::getSnapToken($orderDetails);
    return $snapToken;
  }
}
