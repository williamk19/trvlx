import '@/bootstrapAdmin';
import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import TableOrder from '@/Components/admin/Order/TableOrder';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import { router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';

export default function OrderDataPage(props) {
  const [searchQuery, setSearchQuery] = useState(props.query);
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
      if (searchQuery === "") {
        Inertia.visit(`${base_url}`, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      } else {
        Inertia.get(route(route().current()),
          { search: searchQuery },
          {
            replace: true,
            preserveState: true,
            preserveScroll: true
          }
        );
      }
      setUpdatedMessage(true);
      setUpdate(false);
    }
  }, [updated]);

  useEffect(() => {
    if (!_.isEmpty(props.flash.message) && props.flash.message.type === "info") {
      toast.info(`Order Berhasil Diubah`, {
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
      toast.error(`Order Berhasil Dihapus`, {
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
    } else if (updatedMessage === true) {
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
  }, [props.flash, updatedMessage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (searchQuery !== props.query) {
      if (searchQuery === "") {
        Inertia.visit(`${base_url}`, {
          replace: true,
          preserveState: true,
          preserveScroll: true
        });
      } else {
        Inertia.get(route(route().current()),
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
