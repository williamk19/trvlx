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
      $table->id();
      $table->foreignId('id_user')->constrained('users');
      $table->foreignId('id_layanan')->constrained('layanan');
      $table->foreignId('id_lokasi')->constrained('lokasi');
      $table->string('nama_penumpang');
      $table->date('tanggal_pemberangkatan');
      $table->enum('status_pembayaran', [
        'pending',
        'confirmed',
        'rejected'
      ]);
      $table->integer('total_seat');
      $table->string('total_harga');
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
