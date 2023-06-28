import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import TravelWrapper from '@/Components/Client/Dashboard/TravelWrapper';
import PaginationKendaraan from '@/Components/admin/Kendaraan/PaginationKendaraan';
import { router } from '@inertiajs/react';
import NotFound from '@/assets/icon/not-found.svg'

export default function Dashboard(props) {
  const [orderList, setOrderList] = useState(props.orderList.data);
  const [prevUrl, setPrevUrl] = useState(props.orderList.prev_page_url);
  const [nextUrl, setNextUrl] = useState(props.orderList.next_page_url);

  useEffect(() => {
    setOrderList(props.orderList.data);
    setPrevUrl(props.orderList.prev_page_url);
    setNextUrl(props.orderList.next_page_url);
  }, [props.orderList.data, props.orderList.prev_page_url, props.orderList.next_page_url]);

  const handleNextClick = () => {
    if (nextUrl === null)
      return;
    router.get(nextUrl, {}, {
      replace: true
    });
  };

  const handlePrevClick = () => {
    if (prevUrl === null)
      return;
    router.get(prevUrl, {}, {
      replace: true
    });
  };

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
      <div className="py-1">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className='mb-8 flex justify-between'>
            <h1 className='text-xl md:text-2xl basis-3/4 md:basis-5/6 font-medium text-slate-800'>
              Selamat Datang,
              <span className='font-bold block'>{props.auth.user.nama_user} ✨</span>
            </h1>
            <Link href={route('client-order.data')}>
              <button className="btn sm:w-30 md:w-40 bg-indigo-500 hover:bg-indigo-600 border-none text-white">
                <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden sm:block ml-0 sm:ml-2 sm:text-xs">Pesan Travel</span>
              </button>
            </Link>
          </div>
          <h1 className='text-xl md:text-2xl mb-5 md:mb-4 font-semibold text-slate-800'>
            Tiket Travel 🎟️
          </h1>
          {orderList.length > 0 ? (
            <>
              <TravelWrapper orderList={orderList} />
              <div className='mt-12'>
                <PaginationKendaraan
                  firstIndex={props.orderList.from}
                  lastIndex={props.orderList.to}
                  dataLength={props.orderList.total}
                  handleNextClick={handleNextClick}
                  handlePrevClick={handlePrevClick}
                />
              </div>
            </>
          ) : (
            <div className='mt-24 md:mt-32 w-full flex flex-col items-center'>
              <img className='w-14 md:w-20 mb-5 drop-shadow-md' src={NotFound} />
              <p className='font-medium text-sm md:text-lg text-gray-500'>
                Order Travel Belum Ditemukan
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
