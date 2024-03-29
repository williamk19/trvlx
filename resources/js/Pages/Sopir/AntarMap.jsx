import HeaderSupir from '@/Components/admin/HeaderSupir';
import BoxMap from '@/Components/MapBox/BoxMap';
import AntarJemputCard from '@/Components/Sopir/Antar/AntarJemputCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const AntarMap = (props) => {
  const { url } = usePage();
  const pathname = url;
  const [mapState, setMapState] = useState([]);

  useEffect(() => {
    const maps = props.order.map((o) => [o.lokasi.lat_tujuan, o.lokasi.lng_tujuan]);
    setMapState(maps);
  }, []);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Peta Penjemputan</h2>}
    >
      <Head title="Peta Penjemputan" />
      <div className="py-0 h-full">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">
          <HeaderSupir
            url={pathname}
          />
          <div className='flex flex-col gap-y-4 sm:flex-row mb-5 w-full justify-between'>
            <div className='flex justify-between flex-col xs:flex-row w-full'>
              <h1 className='text-base md:text-2xl font-semibold text-slate-800 mb-6'>
                Lokasi Titik Antar 🚘<br />
              </h1>
              <div className='flex flex-row xs:flex-col justify-between'>
                <div className='font-semibold text-slate-700 text-sm md:text-xl'>
                  {props.tanggalPemberangkatan}
                </div>
                <div className='font-semibold flex gap-2 text-slate-700 text-sm md:text-base'>
                  {props.layanan.layanan.kota_asal}
                  <ArrowRightIcon className='w-3' />
                  {props.layanan.layanan.kota_tujuan}
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col-reverse justify-start md:h-5/6 md:flex-row gap-5 h-3/4 md:5/6'>
            <div className='w-full h-full pr-0'>
              <BoxMap
                orderType='antar'
                type='route'
                orders={props.order}
                destination={mapState} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  );
};

export default AntarMap;
