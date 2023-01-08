import React from 'react';
import { ArrowSmallRightIcon, TruckIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/inertia-react';

const DataItem = ({ tanggalPemberangkatan, idLayanan, kotaAsal, kotaTujuan }) => {
  return (
    <div>
      <ul className="my-1">
        <li className="flex px-2">
          <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
            <div className="grow flex justify-between">
              <div className="self-center">
                <h1 className='font-semibold text-gray-700 text-sm md:text-base mb-2'>
                  {tanggalPemberangkatan}
                </h1>
                <div className='font-medium text-gray-700 text-sm md:text-base flex gap-2 items-center'>
                  {kotaAsal} <span><ArrowSmallRightIcon className='w-4 md:w-5' /></span> {kotaTujuan}
                </div>
              </div>
              <div className="text-base shrink-0 self-end ml-2 flex items-center justify-center gap-1">
                <Link
                  href={route('sopir.detail', {
                    tanggalPemberangkatan: tanggalPemberangkatan,
                    idLayanan: idLayanan
                  })}
                  className="font-semibold flex items-center justify-center gap-1 text-indigo-500 text-sm md:text-base hover:text-indigo-600">
                  <h1 className='hidden xs:block'>Tampilkan</h1>
                  <ArrowSmallRightIcon className='w-4 md:w-5 stroke-2 text-indigo-500 hover:text-indigo-600' />
                </Link>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DataItem;