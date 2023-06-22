import '@/bootstrapAdmin';
import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DashboardCard from '@/Components/admin/Dashboard/DashboardCard';
import cs from '@/assets/icon/cs.png';
import ticket from '@/assets/icon/ticket.png';
import travel from '@/assets/icon/travel.png';
import DashboardTable from '@/Components/admin/Dashboard/DashboardTable';
import { toast, ToastContainer } from 'react-toastify';
import { router } from '@inertiajs/react';

export default function Dashboard(props) {
  const [updated, setUpdate] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState(false);
  let { url } = usePage();
  const base_url = url.split("?").slice(0, 1).join();

  useEffect(() => {
    window.Echo.channel('orders').listen('OrderCreated', (e) => {
      setUpdate(true);
    });
  }, []);

  useEffect(() => {
    if (updated === true) {
      Inertia.visit(`${base_url}`, {
        replace: true,
        preserveState: true,
        preserveScroll: true
      });
      setUpdatedMessage(true);
      setUpdate(false);
    }
  }, [updated]);

  useEffect(() => {
    if (updatedMessage === true) {
      toast.success(`Order Baru Diterima`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUpdatedMessage(false);
    }
  }, [updatedMessage]);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <ToastContainer />
      <div className="">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className='mb-8'>
            <h1 className='text-xl md:text-2xl font-medium text-slate-800'>
              Selamat Datang,
              <br />
              <span className='font-bold'>{props.auth.user.nama_user}</span> ✨
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 max-w-6xl">
            <DashboardCard
              id={0}
              imgUrl={cs}
              title={"Total Order Travel"}
              url={"/order"}
              count={props.orderCount}
              doneCount={props.orderDoneCount} />
            <DashboardCard
              id={1}
              imgUrl={ticket}
              title={"Total Layanan Travel"}
              url={"/layanan"}
              count={props.layananCount} />
            <DashboardCard
              id={2}
              imgUrl={travel}
              title={"Total Kendaraan Travel"}
              url={"/kendaraan"}
              count={props.kendaraanCount} />
          </div>
          <div className='max-w-6xl mt-5'>
            <DashboardTable
              lastDoneOrder={props.lastDoneOrder}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
