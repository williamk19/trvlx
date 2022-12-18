<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kendaraan extends Model
{
  use HasFactory;
  // use SoftDeletes;

  protected $table = 'kendaraan';
  protected $primaryKey = 'id_kendaraan';

  protected $fillable = [
    'plat_nomor',
    'merk_mobil',
    'nama_mobil',
    'jumlah_seat',
    'created_at',
    'updated_at'
  ];
}
