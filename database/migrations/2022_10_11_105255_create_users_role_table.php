<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('users_role', function (Blueprint $table) {
      $table->id();
      $table->string('nama_kategori');
    });

    DB::table('users_role')->insert([
      ['nama_kategori' => 'Super Admin'],
      ['nama_kategori' => 'Admin'],
      ['nama_kategori' => 'Sopir Travel'],
      ['nama_kategori' => 'Pelanggan']
    ]);
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('users_role');
  }
};
