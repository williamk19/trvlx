import '@/bootstrapAdmin';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className='mb-8'>
            <h1 className='text-xl md:text-2xl font-medium text-slate-800'>
              Selamat Datang, <span className='font-bold'>{props.auth.user.nama_user}</span> ✨
            </h1>
          </div>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
