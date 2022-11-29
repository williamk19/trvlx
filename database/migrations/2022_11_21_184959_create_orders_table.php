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
    Schema::create('orders', function (Blueprint $table) {
      $table->id('id_order');
      $table->foreignId('id_user')->constrained('users');
      $table->unsignedBigInteger('id_layanan');
      $table->unsignedBigInteger('id_lokasi');
      $table->unsignedBigInteger('id_kendaraan');
      $table->string('nama_penumpang');
      $table->date('tanggal_pemberangkatan');
      $table->enum('status_pembayaran', [
        'pending',
        'rejected',
        'done'
      ]);
      $table->integer('total_seat');
      $table->string('total_harga');

      $table->foreign('id_kendaraan')->references('id_kendaraan')->on('kendaraan');
      
      $table->foreign('id_layanan')->references('id_layanan')->on('layanan');
      $table->foreign('id_lokasi')->references('id_lokasi')->on('lokasi');
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
    Schema::dropIfExists('orders');
  }
};
