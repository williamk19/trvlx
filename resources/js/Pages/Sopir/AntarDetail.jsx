import HeaderSupir from '@/Components/admin/HeaderSupir';
import DetailsCard from '@/Components/Sopir/Antar/DetailsCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import React from 'react';

const AntarDetail = (props) => {
  const { url } = usePage();
  const pathname = url;

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Antar Detail</h2>}
    >
      <Head title="Antar Detail" />
      <div className="py-0">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <HeaderSupir
            url={pathname}
          />
          <div className='flex flex-col gap-y-4 sm:flex-row mb-8 w-full justify-between'>
            <div>
              <h1 className='text-xl md:text-2xl font-semibold text-slate-800 mb-6'>
                Detail Pengantaran Travel 🚘<br />
              </h1>
              <div className='font-semibold text-slate-600 text-base md:text-xl'>
                {props.tanggalPemberangkatan}
              </div>
              <div className='font-semibold flex gap-2 text-slate-600 text-sm md:text-base'>
                {props.layanan.kota_asal}
                <ArrowRightIcon className='w-3' />
                {props.layanan.kota_tujuan}
              </div>
            </div>
          </div>
          <div className='flex flex-col-reverse md:gap-4 md:flex-row w-full'>
            <div className='md:basis-4/6 h-96 md:h-96 overflow-auto pr-4'>
              {props.order.map((o, idx) => (
                <>
                  <DetailsCard order={o} key={idx} />
                </>
              ))}
            </div>
            <div className='pr-4 w-full mb-5 max-h-56 md:basis-2/6 flex flex-row md:flex-col gap-2'>
              <Link
              className='w-1/2 md:w-full'
                href={route('sopir.jemput', {
                  tanggalPemberangkatan: props.tanggalPemberangkatan,
                  idLayanan: props.layanan.id
                })}
              >
                <div className='bg-sky-300 text-gray-800 font-semibold shadow-md p-4 rounded-lg basis-1/2 w-full md:w-full border-2 border-gray-500'>
                  <h1>Rute Penjemputan</h1>
                </div>
              </Link>
              <Link
                className='w-1/2 md:w-full'
                href={route('sopir.antar', {
                  tanggalPemberangkatan: props.tanggalPemberangkatan,
                  idLayanan: props.layanan.id
                })}>
                <div className='bg-green-300 text-gray-800 font-semibold p-4 shadow-md rounded-lg basis-1/2 w-full md:w-full border-2 border-gray-500'>
                  <h1>Rute Pengantaran</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AntarDetail;