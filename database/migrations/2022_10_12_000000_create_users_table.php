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
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('nama_user');
      $table->foreignId('id_kategori')->constrained('users_role');
      $table->string('email_user')->unique();
      $table->string('telepon_user')->unique();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->rememberToken();
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
    Schema::dropIfExists('users');
    // Schema::table('users', function (Blueprint $table) {
    //   $table->dropForeign('users_id_kategori_foreign');
    //   $table->dropIndex('users_id_kategori_index');
    //   $table->dropColumn('id_kategori');
    // });
  }
};
