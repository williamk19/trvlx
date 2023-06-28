import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import PaginationKendaraan from './PaginationKendaraan';

const TableKendaraan = ({ kendaraan, query }) => {
  const [data, setData] = useState(kendaraan.data);
  const [prevUrl, setPrevUrl] = useState(kendaraan.prev_page_url);
  const [nextUrl, setNextUrl] = useState(kendaraan.next_page_url);

  useEffect(() => {
    setData(kendaraan.data);
    setPrevUrl(kendaraan.prev_page_url);
    setNextUrl(kendaraan.next_page_url);
  }, [kendaraan.data, kendaraan.prev_page_url, kendaraan.next_page_url]);

  const handleNextClick = () => {
    if (nextUrl === null)
      return;

    if (query) {
      router.get(`${nextUrl}&search=${query}`, {}, {
        replace: true
      });
    } else if (nextUrl !== null) {
      router.get(nextUrl, {}, {
        replace: true
      });
    }
  };

  const handlePrevClick = () => {
    if (prevUrl === null)
      return;

    if (query) {
      router.get(`${prevUrl}&search=${query}`, {}, {
        replace: true
      });
    } else if (prevUrl !== null) {
      router.get(prevUrl, {}, {
        replace: true
      });
    }
  };

  const renderData = data.length > 0 ? data.map((k) => {
    return (
      <tr key={k.id}>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{k.merk_mobil}, {k.nama_mobil}</div>
            </div>
          </div>
        </td>
        <td>
          {k.plat_nomor}
        </td>
        <td>{k.jumlah_seat} Penumpang</td>
        <th>
          <Link
            href={`/kendaraan/${k.id}/edit`}
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
              <th className='text-base'>Nama Kendaraan</th>
              <th className='text-base'>Plat Nomor</th>
              <th className='text-base'>Jumlah Seat</th>
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
          firstIndex={kendaraan.from}
          lastIndex={kendaraan.to}
          dataLength={kendaraan.total}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableKendaraan;
