import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import TableKendaraan from '@/Components/admin/Kendaraan/TableKendaraan';
import { toast, ToastContainer } from 'react-toastify';

const Kendaraan = (props) => {
  const [searchQuery, setSearchQuery] = useState(props.query);
  let { url } = usePage();
  const base_url = url.split("?").slice(0, 1).join();

  useEffect(() => {
    if (!_.isEmpty(props.flash.message) && props.flash.message.type === "info") {
      toast.info(`${props.flash.message.merk_mobil}, ${props.flash.message.nama_mobil} Berhasil Diubah`, {
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
      toast.error(`${props.flash.message.merk_mobil}, ${props.flash.message.nama_mobil} Berhasil Dihapus`, {
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
      toast.success(`${props.flash.message.merk_mobil}, ${props.flash.message.nama_mobil} Berhasil Dibuat`, {
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
      if (searchQuery === "") {
        router.visit(`${base_url}`, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      } else {
        router.get(route(route().current()),
          { search: searchQuery },
          {
            replace: true,
            preserveState: true,
            preserveScroll: true
          }
        );
      }
    }
  }, [searchQuery]);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kendaraan</h2>}
    >
      <Head title="Kendaraan" />
      <HeaderAdmin
        title='Kendaraan 🚗'
        url={url}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        addButton={true}
        buttonLink={route('kendaraan.create')}
      />
      <TableKendaraan kendaraan={props.kendaraan} />
      <ToastContainer />
    </AuthenticatedLayout>
  );
};

export default Kendaraan;
