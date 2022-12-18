<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  use HasFactory;
  protected $table = 'order';
  protected $primaryKey = 'id';

  protected $fillable = [
    'id_user',
    'id_layanan',
    'id_lokasi',
    'nama_penumpang',
    'tanggal_pemberangkatan',
    'status_pembayaran',
    'total_seat',
    'total_harga'
  ];
}
