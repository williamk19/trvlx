<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lokasi extends Model
{
  use HasFactory;
  protected $table = 'lokasi';
  protected $primaryKey = 'id';

  protected $fillable = [
    'lat_asal',
    'lng_asal',
    'lat_tujuan',
    'lng_tujuan',
    'alamat_asal',
    'alamat_tujuan',
    'deskripsi_asal',
    'deskripsi_tujuan',
    'created_at',
    'updated_at'
  ];

  public function order() {
    return $this->hasOne(Order::class, 'id_lokasi');
  }
}
