<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  use HasFactory;
  protected $table = 'order';
  protected $primaryKey = 'id_order';

  protected $fillable = [
    'id_user',
    'id_layanan',
    'id_lokasi',
    'id_kendaraan',
    'nama_penumpang',
    'tanggal_pemberangkatan',
    'status_pembayaran',
    'total_seat',
    'total_harga'
  ];
}
