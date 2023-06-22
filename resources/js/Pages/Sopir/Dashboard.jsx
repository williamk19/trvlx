import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ReactDatePicker from 'react-datepicker';
import DataList from '@/Components/Sopir/Dashboard/DataList';
import 'react-datepicker/dist/react-datepicker.css';
import { router } from '@inertiajs/react';
import HeaderSupir from '@/Components/admin/HeaderSupir';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';

export default function Dashboard(props) {
  const [date, setDate] = useState(props.date);
  const [update, setUpdate] = useState(false);
  const [dateShow, setDateShow] = useState(new Date(props.date));
  const { url } = usePage();

  useEffect(() => {
    if (update) {
      Inertia.get(route(route().current()),
        { tanggalPemberangkatan: date },
        {
          replace: true,
          preserveState: true,
          preserveScroll: true
        }
      );
      setUpdate(false);
    }
  }, [date]);

  useEffect(() => {
    setDate(new Date(dateShow).toISOString().slice(0, 10));
    setUpdate(true);
  }, [dateShow]);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <div className="py-0 md:py-8">
        <div className="max-w-7xl">
          {props.auth.user.id_kategori === '3' && (
            <HeaderSupir
              className={'mb-4'}
              url={url}
            />
          )}
          <div className='flex flex-col xs:flex-row w-full justify-between'>
            {props.auth.user.id_kategori === '3' && (
              <h1 className='text-xl md:text-2xl mb-5 font-medium text-slate-800'>
                Selamat Datang,<br />
                <span className='font-bold'>{props.auth.user.nama_user}</span> ✨
              </h1>
            )}
            {props.auth.user.id_kategori === '2' || props.auth.user.id_kategori === '1' && (
              <HeaderAdmin title={'Jadwal Keberangkatan 🗓️'} url={url} />
            )}
            <div className='flex flex-col justify-end font-semibold gap-2 pb-8'>
              <ReactDatePicker
                disabledKeyboardNavigation
                onFocus={e => e.target.blur()}
                className='rounded-lg text-gray-700 w-40'
                onChange={(date) => setDateShow(date)}
                selected={dateShow}
              />
            </div>
          </div>
          <div className=''>
            <DataList idKategori={props.auth.user.id_kategori} dataLayananSopir={props.dataLayananSopir} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  );
}
