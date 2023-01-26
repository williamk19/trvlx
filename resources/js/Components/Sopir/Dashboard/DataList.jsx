import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import DataItem from './DataItem';

const DataList = ({ idKategori, dataLayananSopir }) => {
  let nextUrl = idKategori === 3 ? 'sopir.detail' : 'keberangkatan.detail';

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-xl border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-md md:text-lg text-slate-800">
          Travel 7 Hari Mendatang
        </h2>
      </header>
      <div className="p-3">
        {dataLayananSopir.length === 0 && (
          <div className='text-center'>
            <p className='font-semibold text-gray-700'>Belum Ada Pengantaran Travel</p>
          </div>
        )}
        {dataLayananSopir.map((d, idx) => (
          <Link
            key={idx}
            href={route(nextUrl, {
              tanggalPemberangkatan: d.tanggal_pemberangkatan,
              idLayanan: d.layanan.id
            })}
          >
            <DataItem
              tanggalPemberangkatan={d.tanggal_pemberangkatan}
              kotaAsal={d.layanan.kota_asal}
              kotaTujuan={d.layanan.kota_tujuan}
              idLayanan={d.layanan.id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DataList;
