import { Link } from '@inertiajs/react';
import React from 'react';

const DashboardTable = ({ lastDoneOrder }) => {
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


  const tableData = lastDoneOrder.length > 0 ? lastDoneOrder.map((d) => {
    return (
      <tr className='cursor-pointer' key={d.id_payment}>
        <td className="p-2">
          <Link href={`/order/${d.id}/edit`} className="flex items-center">
            <div className="text-slate-800">{d.nama_penumpang}</div>
          </Link>
        </td>
        <td className="p-2">
          <Link href={`/order/${d.id}/edit`}>
            <div className="text-center">{d.id_payment}</div>
          </Link>
        </td>
        <td className="p-2">
          <Link href={`/order/${d.id}/edit`}>
            <div className="text-center">{d.layanan}</div>
          </Link>
        </td>
        <td className="p-2">
          <Link href={`/order/${d.id}/edit`}>
            <div className='text-center'>
              <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(d.status_pembayaran)}`}>
                {d.status_pembayaran}
              </div>
            </div>
          </Link>
        </td>
        <td className="p-2">
          <Link href={`/order/${d.id}/edit`}>
            <div className="text-center">{d.tanggal_pemberangkatan}</div>
          </Link>
        </td>
      </tr>
    );
  }) : (
    <tr className='text-center'>
      <td className="p-2"></td>
      <td className="p-2"></td>
      <td className="p-2">Data Tidak Ditemukan</td>
      <td className="p-2"></td>
      <td className="p-2"></td>
      <td className="p-2"></td>
    </tr>
  );

  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-xl border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">5 Order Masuk Terakhir (Status Done)</h2>
      </header>
      <div className="p-3">

        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-sm uppercase text-slate-700 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Nama Penumpang</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">ID Pembayaran</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Layanan Order</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Tanggal Berangkat</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center"></div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700 font-medium divide-y divide-slate-100">
              {tableData}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
