<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
  use HasFactory;
  protected $table = 'layanan';
  protected $primaryKey = 'id_layanan';

  protected $fillable = [
    'kota_asal',
    'kota_tujuan',
    'biaya_jasa',
    'created_at',
    'updated_at'
  ];
}
