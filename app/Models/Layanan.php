<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
  use HasFactory;
  protected $table = 'layanan';
  protected $primaryKey = 'id';

  protected $fillable = [
    'id_sopir',
    'id_kendaraan',
    'kota_asal',
    'kota_tujuan',
    'biaya_jasa',
    'status',
    'created_at',
    'updated_at'
  ];

  public function sopir()
  {
    return $this->belongsTo(User::class, 'id_sopir');
  }

  public function kendaraan()
  {
    return $this->belongsTo(Kendaraan::class, 'id_kendaraan');
  }

  public function order()
  {
    return $this->hasMany(Order::class);
  }
}
