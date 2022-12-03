<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lokasi extends Model
{
  use HasFactory;
  protected $table = 'lokasi';
  protected $primaryKey = 'id_lokasi';

  protected $fillable = [
    'lat_lng_asal',
    'lat_lng_tujuan',
    'alamat_lengkap_asal',
    'alamat_lengkap_tujuan',
    'deskripsi_lokasi',
    'created_at',
    'updated_at'
  ];
}
