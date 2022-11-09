<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
  use HasFactory;
  protected $table = 'users_role';
  protected $primaryKey = 'id';

  protected $fillable = [
    'nama_kategori',
  ];

  public function user()
  {
    return $this->hasMany(User::class);
  }
}
