<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderConfirmed extends Mailable
{
  use Queueable, SerializesModels;
  public $order;
  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct(Order $order)
  {
    $this->order = $order;
  }

  /**
   * Get the message envelope.
   *
   * @return \Illuminate\Mail\Mailables\Envelope
   */
  public function envelope()
  {
    return new Envelope(
      from: new Address('admin@skytravelink.my.id', 'Admin Trvlx'),
      subject: 'Order Telah Di Konfirmasi',
    );
  }

  /**
   * Get the message content definition.
   *
   * @return \Illuminate\Mail\Mailables\Content
   */
  public function content()
  {
    return new Content(
      markdown: 'emails.orderConfirmed',
      with: [
        'paymentId' => $this->order->id_payment,
        'namaPenumpang' => $this->order->nama_penumpang,
        'tanggalPemberangkatan' => $this->order->tanggal_pemberangkatan,
        'kotaAsal' => $this->order->schedule->layanan->kota_asal,
        'kotaTujuan' => $this->order->schedule->layanan->kota_tujuan,
        'jumlahSeat' => $this->order->total_seat,
        'alamatAsal' => $this->order->lokasi->alamat_asal,
        'alamatTujuan' => $this->order->lokasi->alamat_tujuan,
        'totalHarga' => $this->order->total_harga,
        'url' => url('/client-order/payment/'. $this->order->id)
      ],
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array
   */
  public function attachments()
  {
    return [];
  }
}
