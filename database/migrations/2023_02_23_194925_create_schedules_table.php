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
    Schema::create('schedules', function (Blueprint $table) {
      $table->id();
      $table->foreignId('id_layanan')->constrained('layanan');
      $table->foreignId('id_sopir')->constrained('users')->onDelete('cascade');
      $table->foreignId('id_kendaraan')->constrained('kendaraan')->onDelete('cascade');
      $table->enum('status', ['active', 'disabled']);
      $table->time('waktu');
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
    Schema::dropIfExists('schedules');
  }
};
