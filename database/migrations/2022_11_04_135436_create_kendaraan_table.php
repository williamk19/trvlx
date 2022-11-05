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
      $table->id();
      $table->string('plat_nomor')->unique();
      $table->string('merk_mobil');
      $table->string('nama_mobil');
      $table->unsignedInteger('jumlah_seat');
      $table->timestamps();
    });

    DB::table('kendaraan')->insert([
      [
        'plat_nomor' => 'M150DD',
        'merk_mobil' => 'Toyota',
        'nama_mobil' => 'Xenia 2022',
        'jumlah_seat' => 5
      ]
    ]);
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
