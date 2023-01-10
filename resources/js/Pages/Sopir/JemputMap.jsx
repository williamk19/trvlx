import BoxMap from '@/Components/MapBox/BoxMap';
import DetailsCard from '@/Components/Sopir/Antar/DetailsCard';
import JemputCard from '@/Components/Sopir/Antar/JemputCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/inertia-react';

const JemputMap = (props) => {
  console.log(props);
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Peta Penjemputan</h2>}
    >
      <Head title="Peta Penjemputan" />
      <div className="py-0 h-full">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">
          <div className='flex flex-col gap-y-4 sm:flex-row mb-5 w-full justify-between'>
            <div className='flex justify-between flex-col xs:flex-row w-full'>
              <h1 className='text-base md:text-2xl font-semibold text-slate-800 mb-6'>
                Lokasi Titik Jemput 🚘<br />
              </h1>
              <div className='flex flex-row xs:flex-col justify-between'>
                <div className='font-semibold text-slate-700 text-sm md:text-xl'>
                  {props.tanggalPemberangkatan}
                </div>
                <div className='font-semibold flex gap-2 text-slate-700 text-sm md:text-base'>
                  {props.layanan.kota_asal}
                  <ArrowRightIcon className='w-3' />
                  {props.layanan.kota_tujuan}
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col-reverse justify-start md:h-4/6 md:flex-row gap-5 h-5/6'>
            <div className='basis-1/2 md:basis-1/3 overflow-scroll h-45 md:h-full pr-3'>
              {props.order.map((o, idx) => (
                <>
                  <JemputCard order={o} key={idx} />
                </>
              ))}
            </div>
            <div className='w-full basis-1/2 md:basis-2/3 md:h-full pr-0'>
              <BoxMap type='route' />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  );
};

export default JemputMap;