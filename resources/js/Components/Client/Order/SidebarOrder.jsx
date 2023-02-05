import { usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const SidebarOrder = ({ tanggalPemberangkatan, idLayanan }) => {
  const { url } = usePage();
  const pathname = url;

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:overflow-auto px-5 py-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3">
      <div>
        <div className="text-sm font-semibold text-slate-700 uppercase mb-3">
          Form Pemesanan Order Travel
        </div>
        <ul className="flex flex-nowrap mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link preserveState href={`/client-order/data?tanggalPemberangkatan=${tanggalPemberangkatan}&idLayanan=${idLayanan}`} className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/client-order/data') && 'bg-gray-300'}`}>
              <span className={`text-sm font-medium ${pathname.includes('/client-order/data') ? 'text-slate-800' : 'text-slate-600 hover:text-slate-900'}`}>
                Data Diri
              </span>
            </Link>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link preserveState href="/client-order/jemput" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/client-order/jemput') && 'bg-gray-300'}`}>
              <span className={`text-sm font-medium ${pathname.includes('/client-order/jemput') ? 'text-slate-800' : 'text-slate-600 hover:text-slate-900'}`}>
                Penjemputan
              </span>
            </Link>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link preserveState href="/client-order/tujuan" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/client-order/tujuan') && 'bg-gray-300'}`}>
              <span className={`text-sm font-medium ${pathname.includes('/client-order/tujuan') ? 'text-slate-800' : 'text-slate-600 hover:text-slate-900'}`}>
                Tujuan
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarOrder;
