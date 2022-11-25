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
    Schema::create('kendaraan', function (Blueprint $table) {
      $table->id('id_kendaraan');
      $table->string('plat_nomor')->unique();
      $table->string('merk_mobil');
      $table->string('nama_mobil');
      $table->unsignedInteger('jumlah_seat');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('kendaraan');
  }
};
