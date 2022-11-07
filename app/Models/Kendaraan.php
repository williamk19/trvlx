<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kendaraan extends Model
{
  use HasFactory;

  protected $table = 'kendaraan';
  protected $primaryKey = 'id';

  protected $fillable = [
    'plat_nomor',
    'merk_mobil',
    'nama_mobil',
    'jumlah_seat',
    'created_at',
    'updated_at'
  ];
}