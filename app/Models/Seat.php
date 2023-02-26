<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
  use HasFactory;
  protected $table = 'seats';
  protected $primaryKey = 'id';

  protected $fillable = [
    'id_order',
    'seat_number',
    'created_at',
    'updated_at'
  ];

  public function order()
  {
    return $this->belongsTo(Order::class, 'id_order');
  }
}
