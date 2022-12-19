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
    Schema::create('layanan', function (Blueprint $table) {
      $table->id();
      $table->foreignId('id_sopir')->constrained('users')->onDelete('cascade');
      $table->foreignId('id_kendaraan')->constrained('kendaraan')->onDelete('cascade');
      $table->string('kota_asal');
      $table->string('kota_tujuan');
      $table->double('biaya_jasa');
      $table->enum('status', ['active', 'disabled']);
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
    Schema::dropIfExists('layanan');
  }
};
