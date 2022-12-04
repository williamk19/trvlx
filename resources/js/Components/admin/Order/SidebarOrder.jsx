import { usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';
import React from 'react'

const SidebarOrder = () => {
  const { url } = usePage();
  const pathname = url;

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3">
      <div>
        <div className="text-sm font-semibold text-slate-700 uppercase mb-3">
          Form Pemesanan Order Travel
        </div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link end href="/settings/account" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/account') && 'bg-indigo-50'}`}>
              <span className={`text-sm font-medium text-slate-600 ${pathname.includes('/settings/account') ? 'text-indigo-500' : 'hover:text-slate-900'}`}>
                Data Diri
              </span>
            </Link>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link end href="/settings/notifications" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/notifications') && 'bg-indigo-50'}`}>
              <span className={`text-sm font-medium text-slate-600 ${pathname.includes('/settings/notifications') ? 'text-indigo-500' : 'hover:text-slate-900'}`}>
                Penjemputan
              </span>
            </Link>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <Link end href="/settings/apps" className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes('/settings/apps') && 'bg-indigo-50'}`}>
              <span className={`text-sm font-medium text-slate-600 ${pathname.includes('/settings/apps') ? 'text-indigo-500' : 'hover:text-slate-900'}`}>
                Tujuan
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SidebarOrder