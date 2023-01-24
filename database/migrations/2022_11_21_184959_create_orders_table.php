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
      $table->string('id_payment')->nullable();
      $table->foreignId('id_user')->constrained('users');
      $table->foreignId('id_layanan')->constrained('layanan');
      $table->foreignId('id_lokasi')->constrained('lokasi');
      $table->string('nama_penumpang');
      $table->date('tanggal_pemberangkatan');
      $table->enum('status_pembayaran', [
        'init',
        'pending',
        'done',
        'confirmed',
        'failed'
      ]);
      $table->integer('total_seat');
      $table->double('total_harga');
      $table->string('snap_token')->nullable();
      $table->timestamps();
      $table->softDeletes();
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
