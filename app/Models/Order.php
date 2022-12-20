<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  use HasFactory;
  protected $table = 'orders';
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

  public function lokasi()
  {
    return $this->belongsTo(Lokasi::class, 'id_lokasi');
  }

  public function layanan() 
  {
    return $this->belongsTo(Layanan::class, 'id_layanan');
  }
}
