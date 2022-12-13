<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kendaraan;
use App\Models\Layanan;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserRole;
use Carbon\Carbon;
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

    UserRole::insert([
      ['nama_kategori' => 'super admin'],
      ['nama_kategori' => 'admin'],
      ['nama_kategori' => 'sopir'],
      ['nama_kategori' => 'pelanggan']
    ]);

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
      'nama_user' => 'Sopir Travel',
      'id_kategori' => 3,
      'email' => 'sopir@travel.com',
      'telepon_user' => "+62" . '8947364983',
      'password' => Hash::make(env('PASSWORD_ADMIN')),
    ]);

    Kendaraan::insert([
      [
        'plat_nomor' => 'M150DD',
        'merk_mobil' => 'Daihatsu',
        'nama_mobil' => 'Xenia 2022',
        'jumlah_seat' => 5,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'L472XD',
        'merk_mobil' => 'Toyota',
        'nama_mobil' => 'Hiace 2019',
        'jumlah_seat' => 14,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'M293XT',
        'merk_mobil' => 'Daihatsu',
        'nama_mobil' => 'Terios 2022',
        'jumlah_seat' => 6,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'M517BD',
        'merk_mobil' => 'Toyota',
        'nama_mobil' => 'Hiace 2020',
        'jumlah_seat' => 14,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'D223PL',
        'merk_mobil' => 'Suzuki',
        'nama_mobil' => 'Ertiga Black',
        'jumlah_seat' => 6,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'CN102DC',
        'merk_mobil' => 'Toyota',
        'nama_mobil' => 'Inova',
        'jumlah_seat' => 7,
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'plat_nomor' => 'S924IP',
        'merk_mobil' => 'Suzuki',
        'nama_mobil' => 'APV Deluxe 2017',
        'jumlah_seat' => 7,
        'created_at' => $now,
        'updated_at' => $now
      ]
    ]);

    Layanan::insert([
      [
        'kota_asal' => 'Surabaya',
        'kota_tujuan' => 'Malang',
        'biaya_jasa' => '100000',
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'kota_asal' => 'Malang',
        'kota_tujuan' => 'Madura',
        'biaya_jasa' => '200000',
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'kota_asal' => 'Jakarta',
        'kota_tujuan' => 'Malang',
        'biaya_jasa' => '700000',
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'kota_asal' => 'Surabaya',
        'kota_tujuan' => 'Semarang',
        'biaya_jasa' => '450000',
        'created_at' => $now,
        'updated_at' => $now
      ],
      [
        'kota_asal' => 'Yogyakarta',
        'kota_tujuan' => 'Malang',
        'biaya_jasa' => '500000',
        'created_at' => $now,
        'updated_at' => $now
      ],
    ]);

    User::factory(100)->create();
  }
}
