<p align="center"><a href="https://laravel.com" target="_blank"><img src="resources/js/assets/readme/skytravelink.png" width="400" alt="Laravel Logo"></a></p>

## Tentang TRVLX (Skytravelink)

Aplikasi TRVLX adalah sebuah aplikasi berbasis web yang memungkinkan pengguna travel (Skytravelink) untuk melakukan pemesanan jasa travel melalui website. Aplikasi ini juga dilengkapi dengan fitur pemilihan titik lokasi jemput dan antar dengan bantuan Geographical Information System. Dengan beberapa fitur tambahan lainnya diharapkan dapat meningkatkan usabilitas dari aplikasi dan memudahkan pemesanan travel.

### Framework dan Library yang digunakan
- [Laravel](https://laravel.com/) untuk membuat aplikasi yang terhubung dengan database.
- [Inertia React](https://inertiajs.com/) untuk membuat tampilan website yang menarik dengan metode SPA.
- [React Leaflet](https://react-leaflet.js.org/) untuk menampilkan peta pada aplikasi.
- [Tailwind CSS](https://tailwindcss.com/) untuk mempermudah penggunaan CSS tanpa file CSS terpisah.
- [Leaflet Routing Machine](https://www.liedman.net/leaflet-routing-machine/), membantu dalam menentukan rute perjalanan secara otomatis.


## Setup Aplikasi TRVLX

1. Pertama, download atau clone repository ini dengan menjalankan command berikut pada command line.
```
git clone https://github.com/williamk19/trvlx.git
```
  
2. Setelah itu, masuk ke dalam folder dan install library yang diperlukan, seperti berikut:
```
cd trvlx
npm install
composer install
```

3. Buat file .env dengan melakukan copy dari .env.example dan lakukan konfigurasi sesuai dengan sistem.
berikut isikan pada file .env
```
DB_DATABASE=<nama_db>
DB_USERNAME=<username_db>
DB_PASSWORD=<password_db>
```

4. Lakukan migrasi data ke database dan tetapkan key dari aplikasi dengan command berikut
```
php artisan key:generate
php artisan migrate:fresh --seed
```

5. Jalankan aplikasi
```
npm run dev
php artisan serve (jalankan pada terminal terpisah)
```
## Bantuan dan Dukungan

Jika anda memerlukan bantuan dan juga dukungan terkait penggunaan dan ketidaksesuaian sistem, anda dapat mengirim email pada [williamkurniawan1144@gmail.com](mailto:williamkurniawan1144@gmail.com).

## Lisensi

Aplikasi ini dibangun dengan framework laravel yang memiliki lisensi open source sebagai berikut:<br/>
[MIT license](https://opensource.org/licenses/MIT).
