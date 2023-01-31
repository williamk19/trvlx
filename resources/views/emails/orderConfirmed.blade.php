<style>
  /* .responsive-table-mail */
  .responsive-table-mail td:last-of-type {
      color: rgb(107, 107, 107) !important;
      font-weight: 500 !important;
    }

  @media (max-width: 400px) {
    .content-cell {
      padding: 32px 16px !important;
    }
    .responsive-table-mail {
      font-weight: 600 !important;
    }

    .responsive-table-mail td {
      color: rgb(107, 107, 107) !important;
      font-weight: 700 !important;
      display: block !important;
      text-align: left;
    }

    .responsive-table-mail td:last-of-type {
      line-height: 0 !important;
      margin-bottom: 1rem !important;
      color: rgb(107, 107, 107) !important;
      font-weight: 600 !important;
      display: block !important;
      text-align: left;
    }
  }
</style>
<x-mail::message>
  <h1 style="font-size: 1.2rem; text-align:center">
    Order Telah Dikonfirmasi
  </h1>

  <div style="margin-top: 2rem; color:rgb(83, 83, 83); font-weight: 600">
    <p>
      Pesanan Order Travel Anda
    </p>
  </div>

  <div class="responsive-table-mail" style="color:rgb(83, 83, 83); font-weight: 700">
    @component('mail::table')
      | Detail Pesanan | |
      |:------------- |-------------:|
      | Payment Id | {{ $paymentId }} |
      | Nama Penumpang | {{ $namaPenumpang }} |
      | Tanggal Pemberangkatan | {{ $tanggalPemberangkatan }} |
      | Kota Asal - Kota Tujuan | {{ $kotaAsal }} - {{ $kotaTujuan }} |
      | Kursi yang dipesan | {{ $jumlahSeat }} |
      | Alamat asal | {{ $alamatAsal }} |
      | Alamat tujuan | {{ $alamatTujuan }} |
      | Total Harga | {{ $totalHarga }} |
    @endcomponent
  </div>

  @component('mail::button', ['url' => $url])
    Lihat Order
  @endcomponent

  <div style="margin-top: 2rem; color:rgb(83, 83, 83); font-weight: 600">
    Terima Kasih,<br>
    Admin {{ config('app.name') }}
  </div>
</x-mail::message>
