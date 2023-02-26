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
    'kota_asal',
    'kota_tujuan',
    'biaya_jasa',
    'created_at',
    'updated_at'
  ];

  public function schedules()
  {
    return $this->hasMany(Schedule::class, 'id_layanan');
  }
}
