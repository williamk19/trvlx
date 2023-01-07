import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import ReactDatePicker from 'react-datepicker';
import DataList from '@/Components/Sopir/Dashboard/DataList';
import 'react-datepicker/dist/react-datepicker.css';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {
  console.log(props.date);
  const [dateQuery, setDateQuery] = useState(props.date ? new Date(props.date) : "");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (dateQuery !== '') {
      Inertia.get(route(route().current()),
        { date: date },
        {
          replace: true,
          preserveState: true,
          preserveScroll: true
        }
      );
    }
  }, [date]);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <div className="py-0 md:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className='flex flex-col gap-y-4 sm:flex-row mb-8 w-full justify-between'>
            <h1 className='text-xl md:text-2xl font-medium text-slate-800'>
              Selamat Datang,<br />
              <span className='font-bold'>{props.auth.user.nama_user}</span> ✨
            </h1>
            <div className='flex flex-col font-semibold gap-2'>
              <ReactDatePicker
                className='rounded-lg text-gray-700 w-40'
                onChange={(date) => setDate(date)}
                selected={date}
              // minDate={new Date()}
              />
            </div>
          </div>
          <div className=''>
            <DataList dataLayananSopir={props.dataLayananSopir} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  );
}
