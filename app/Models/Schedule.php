<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
  use SoftDeletes;
  use HasFactory;
  protected $table = 'schedules';
  protected $primaryKey = 'id';

  protected $fillable = [
    'id_sopir',
    'id_kendaraan',
    'id_layanan',
    'status',
    'waktu',
    'created_at',
    'updated_at'
  ];

  public function sopir()
  {
    return $this->belongsTo(User::class, 'id_sopir')->withTrashed();
  }

  public function kendaraan()
  {
    return $this->belongsTo(Kendaraan::class, 'id_kendaraan')->withTrashed();
  }

  public function order()
  {
    return $this->hasMany(Order::class, 'id_schedule');
  }
}
