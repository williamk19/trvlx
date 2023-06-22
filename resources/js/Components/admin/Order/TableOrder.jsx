import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';

const TableOrder = ({ order, query }) => {
  const [data, setData] = useState(order.data);
  const [prevUrl, setPrevUrl] = useState(order.prev_page_url);
  const [nextUrl, setNextUrl] = useState(order.next_page_url);

  const statusColor = (type) => {
    switch (type) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-600';
      case 'pending':
        return 'bg-amber-100 text-amber-600';
      case 'failed':
        return 'bg-rose-100 text-rose-600';
      case 'init':
        return 'bg-sky-100 text-sky-600';
      case 'done':
        return 'bg-indigo-100 text-indigo-600';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  useEffect(() => {
    setData(order.data);
    setPrevUrl(order.prev_page_url);
    setNextUrl(order.next_page_url);
  }, [order.data, order.prev_page_url, order.next_page_url]);

  const handleNextClick = () => {
    if (nextUrl === null)
      return;

    if (query) {
      Inertia.get(`${nextUrl}&search=${query}`, {}, {
        replace: true
      });
    } else if (nextUrl !== null) {
      Inertia.get(nextUrl, {}, {
        replace: true
      });
    }
  };

  const handlePrevClick = () => {
    if (prevUrl === null)
      return;

    if (query) {
      Inertia.get(`${prevUrl}&search=${query}`, {}, {
        replace: true
      });
    } else if (prevUrl !== null) {
      Inertia.get(prevUrl, {}, {
        replace: true
      });
    }
  };

  const renderData = data.length > 0 ? data.map((o) => {
    return (
      <tr key={o.id}>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{o.nama_penumpang}</div>
            </div>
          </div>
        </td>
        <td>
          {o.tanggal_pemberangkatan}, {o.jadwal.waktu.split(':').slice(0, -1).join(':')}
        </td>
        <td>
          {`${o.jadwal.layanan.kota_asal} - ${o.jadwal.layanan.kota_tujuan}`}
        </td>
        <td>
          <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(o.status_pembayaran)}`}>
            {o.status_pembayaran}
          </div>
        </td>
        <th>
          <Link
            href={`/order/${o.id}/edit`}
            className="btn bg-indigo-400 border-none hover:bg-indigo-500 btn-xs">
            Edit
          </Link>
        </th>
      </tr>
    );
  }) : (
    <tr className='text-center'>
      <td></td>
      <td>Data Tidak Ditemukan</td>
      <td></td>
    </tr>
  );

  return (
    <>
      <div data-theme="light" className="overflow-x-auto rounded-xl shadow-lg w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nama Penumpang</th>
              <th>Tanggal Berangkat dan Waktu</th>
              <th>Layanan Order</th>
              <th>Status Pembayaran</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderData}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <PaginationKendaraan
          firstIndex={order.from}
          lastIndex={order.to}
          dataLength={order.total}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableOrder;
