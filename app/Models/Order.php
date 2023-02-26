<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
  use HasFactory;
  use SoftDeletes;
  protected $table = 'orders';
  protected $primaryKey = 'id';

  protected $fillable = [
    'id_payment',
    'id_user',
    'id_schedule',
    'id_lokasi',
    'nama_penumpang',
    'tanggal_pemberangkatan',
    'status_pembayaran',
    'total_seat',
    'total_harga',
    'snap_token'
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'id_user');
  }

  public function lokasi()
  {
    return $this->belongsTo(Lokasi::class, 'id_lokasi');
  }

  public function schedule()
  {
    return $this->belongsTo(Schedule::class, 'id_schedule');
  }

  public function seats()
  {
    return $this->hasMany(Seat::class, 'id_order');
  }
}
