import TravelCard from '@/Components/Client/Dashboard/TravelCard';

const TravelWrapper = ({ orderList }) => {
  console.log(orderList);
  return (
    <div className="grid grid-cols-12 gap-6">
      {orderList?.map(order => (
        <TravelCard
          key={order.id}
          id={order.id}
          namaPenumpang={order.nama_penumpang}
          statusPembayaran={order.status_pembayaran}
          kotaAsal={order.layanan.kota_asal}
          kotaTujuan={order.layanan.kota_tujuan}
          tanggalPemberangkatan={order.tanggal_pemberangkatan}
        />
      ))}
    </div>
  );
};

export default TravelWrapper;