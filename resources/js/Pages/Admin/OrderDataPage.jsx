import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import TableOrder from '@/Components/Admin/Order/TableOrder';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import { Inertia } from '@inertiajs/inertia';
import { toast, ToastContainer } from 'react-toastify';

export default function Pengguna(props) {
  console.log(props);
  const [searchQuery, setSearchQuery] = useState(props.query);

  let { url } = usePage();
  const base_url = url.split("?").slice(0, 1).join();

  useEffect(() => {
    if (!_.isEmpty(props.flash.message) && props.flash.message.type === "info") {
      toast.info(`${props.flash.message.nama_user} Berhasil Diubah`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (!_.isEmpty(props.flash.message) && props.flash.message.type === "error") {
      toast.error(`${props.flash.message.nama_user} Berhasil Dihapus`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (!_.isEmpty(props.flash.message)) {
      toast.success(`${props.flash.message.nama_user} Berhasil Dibuat`, {
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (searchQuery !== props.query) {
      Inertia.get(route(route().current()),
        { search: searchQuery },
        { 
          replace: true,
          preserveState: true,
          preserveScroll: true
        }
      );
    } else if (searchQuery === "") {
      Inertia.visit(`${base_url}`, {
        replace: true,
        preserveState: true,
        preserveScroll: true
      });
    }
  }, [searchQuery]);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />
      <HeaderAdmin
        title='Daftar Order Travel ⏭️'
        url={url}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <div className="py-8">
        <div className="mx-auto">
          <TableOrder query={searchQuery} order={props.order} />
          <ToastContainer />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
