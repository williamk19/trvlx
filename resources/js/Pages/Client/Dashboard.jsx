import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { toast, ToastContainer } from 'react-toastify';

export default function Dashboard(props) {
  console.log(props);

  useEffect(() => {
    if (!_.isEmpty(props.flash.message)) {
      toast.success(`Order Berhasil Dibuat`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [props.flash]);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <ToastContainer />
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
