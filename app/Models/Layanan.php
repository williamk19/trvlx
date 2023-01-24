<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Layanan extends Model
{
  use HasFactory;
  use SoftDeletes;
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
    return $this->belongsTo(User::class, 'id_sopir')->withTrashed();
  }

  public function kendaraan()
  {
    return $this->belongsTo(Kendaraan::class, 'id_kendaraan')->withTrashed();
  }

  public function order()
  {
    return $this->hasMany(Order::class, 'id_layanan');
  }
}
