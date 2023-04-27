<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kendaraan;
use App\Models\Layanan;
use App\Models\Lokasi;
use App\Models\Order;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserRole;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    $now = Carbon::now('utc')->toDateTimeString();

    User::create([
      'nama_user' => 'Admin Travel',
      'id_kategori' => 1,
      'email' => 'admin@travel.com',
      'telepon_user' => "+62" . '8123456789',
      'password' => Hash::make(env('PASSWORD_ADMIN')),
    ]);

    User::create([
      'nama_user' => 'Admin Travel 2',
      'id_kategori' => 2,
      'email' => 'admin@travel2.com',
      'telepon_user' => "+62" . '0987654321',
      'password' => Hash::make(env('PASSWORD_ADMIN')),
    ]);

    User::create([
      'nama_user' => 'Darius Hasan',
      'id_kategori' => 3,
      'email' => 'darius@hasan.com',
      'telepon_user' => "+62" . '8947364933',
      'password' => Hash::make(env('PASSWORD_ADMIN')),
    ]);

    User::create([
      'nama_user' => 'Nurman Kurniawan',
      'id_kategori' => 3,
      'email' => 'nurman@kurniawan.com',
      'telepon_user' => "+62" . '8524281232',
      'password' => Hash::make(env('PASSWORD_ADMIN')),
    ]);

    User::create([
      'nama_user' => 'David Setiaji',
      'id_kategori' => 3,
      'email' => 'david@setiaji.com',
      'telepon_user' => "+62" . '8947324983',
      'password' => Hash::make(env('PASSWORD_ADMIN')),
    ]);

    Kendaraan::insert([
      [
        'plat_nomor' => 'M150DD',
        'merk_mobil' => 'Daihatsu',
        'nama_mobil' => 'Xenia 2022',
        'jumlah_seat' => 7,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'L472XD',
        'merk_mobil' => 'Toyota',
        'nama_mobil' => 'Hiace 2019',
        'jumlah_seat' => 15,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'M293XT',
        'merk_mobil' => 'Daihatsu',
        'nama_mobil' => 'Terios 2022',
        'jumlah_seat' => 7,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'M517BD',
        'merk_mobil' => 'Toyota',
        'nama_mobil' => 'Hiace 2020',
        'jumlah_seat' => 15,
        'created_at' => $now,
        'updated_at' => $now
      ],
    ]);

    // Layanan::insert([
    //   [
    //     'id_sopir' => 3,
    //     'id_kendaraan' => 1,
    //     'kota_asal' => 'Surabaya',
    //     'kota_tujuan' => 'Malang',
    //     'biaya_jasa' => '100000',
    //     'status' => 'active',
    //     'created_at' => $now,
    //     'updated_at' => $now
    //   ],
    //   [
    //     'id_sopir' => 3,
    //     'id_kendaraan' => 1,
    //     'kota_asal' => 'Malang',
    //     'kota_tujuan' => 'Madura',
    //     'biaya_jasa' => '200000',
    //     'status' => 'active',
    //     'created_at' => $now,
    //     'updated_at' => $now
    //   ],
    // ]);

    // User::factory(10)->create();
  }
}
