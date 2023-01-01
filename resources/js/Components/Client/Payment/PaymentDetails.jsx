import React from 'react';

const PaymentDetails = ({ order }) => {
  return (
    <div className='bg-white rounded-xl shadow-md basis-3/5 p-6'>
      <h1 className='text-gray-700 font-bold text-xl mb-3'>
        Detail Order
      </h1>
      <ul className='p-1'>
        <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
          <div className="text-sm mb-1 md:mb-0 text-slate-800 font-bold md:font-semibold">
            Payment id
          </div>
          <div className="text-sm text-slate-800">
            <span className="mr-3">
              {`${order.id_payment}`}
            </span>
          </div>
        </li>
        <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
          <div className="text-sm mb-1 md:mb-0 text-slate-800 font-bold md:font-semibold">
            Nama Penumpang
          </div>
          <div className="text-sm text-slate-800">
            <span className="mr-3">
              {`${order.nama_penumpang}`}
            </span>
          </div>
        </li>
        <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
          <div className="text-sm mb-1 md:mb-0 text-slate-800 font-bold md:font-semibold">
            Tanggal Pemberangkatan
          </div>
          <div className="text-sm text-slate-800">
            <span className="mr-3">
              {`${order.tanggal_pemberangkatan}`}
            </span>
          </div>
        </li>
        <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
          <div className="text-sm mb-1 md:mb-0 text-slate-800 font-bold md:font-semibold">
            Kota Asal - Kota Tujuan
          </div>
          <div className="text-sm text-slate-800">
            <span className="mr-3">
              {`${order.layanan.kota_asal} - ${order.layanan.kota_tujuan}`}
            </span>
          </div>
        </li>
        <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
          <div className="text-sm mb-1 md:mb-0 text-slate-800 font-bold md:font-semibold">
            Kursi yang dipesan
          </div>
          <div className="text-sm text-slate-800">
            <span className="mr-3">
              {`${order.total_seat}`}
            </span>
          </div>
        </li>
        <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
          <div className="text-sm mb-1 md:mb-0 text-slate-800 font-bold md:font-semibold">
            Alamat asal
          </div>
          <div className="text-sm text-slate-800">
            <span className="mr-3">
              {`${order.lokasi.alamat_asal}`}
            </span>
          </div>
        </li>
        <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
          <div className="text-sm mb-1 md:mb-0 text-slate-800 font-bold md:font-semibold">
            Alamat tujuan
          </div>
          <div className="text-sm text-slate-800">
            <span className="mr-3">
              {`${order.lokasi.alamat_tujuan}`}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PaymentDetails;