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
        Schema::create('lokasi', function (Blueprint $table) {
            $table->id();
            $table->string('lat_asal');
            $table->string('lng_asal');
            $table->string('lat_tujuan');
            $table->string('lng_tujuan');
            $table->string('alamat_asal');
            $table->string('alamat_tujuan');
            $table->text('deskripsi_asal')->nullable();
            $table->text('deskripsi_tujuan')->nullable();
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
        Schema::dropIfExists('lokasi');
    }
};
