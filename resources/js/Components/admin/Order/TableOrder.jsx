import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';

const TableOrder = ({ order, query }) => {
  const [data, setData] = useState(order.data);
  const [prevUrl, setPrevUrl] = useState(order.prev_page_url);
  const [nextUrl, setNextUrl] = useState(order.next_page_url);

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

  const pathMapping = (id) => {
    switch (id) {
      case 1:
        return '/admin';
      case 2:
        return '/admin';
      case 3:
        return '/sopir';
      case 4:
        return '/pengguna';
      default:
        return '/pengguna';
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
          {o.tanggal_pemberangkatan}
        </td>
        <td>
          {`${o.layanan.kota_asal} - ${o.layanan.kota_asal}`}
        </td>
        <td>
          {o.status_pembayaran}
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
      <div data-theme="light" className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nama Penumpang</th>
              <th>Tanggal Berangkat</th>
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