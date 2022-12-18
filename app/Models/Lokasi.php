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
    'lat_lng_asal',
    'lat_lng_tujuan',
    'alamat_asal',
    'alamat_tujuan',
    'deskripsi_asal',
    'deskripsi_tujuan',
    'created_at',
    'updated_at'
  ];
}
