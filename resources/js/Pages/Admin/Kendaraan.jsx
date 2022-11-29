import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import TableKendaraan from '@/Components/Admin/Kendaraan/TableKendaraan';
import NotificationKendaraan from '@/Components/Admin/NotificationAdmin';

const Kendaraan = (props) => {
  const [searchQuery, setSearchQuery] = useState(props.query);
  const [notificationOpen, setNotificationOpen] = useState(true);
  let { url } = usePage();

  useEffect(() => {
    if (notificationOpen === true) {
      setTimeout(() => {
        setNotificationOpen(false);
      }, 5000);
    }
  }, [notificationOpen]);

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
      Inertia.visit(route(route().current()), {
        replace: true,
        preserveState: true,
        preserveScroll: true
      });
    }
  }, [searchQuery]);

  const messageNotification = (type) => {
    if (type === undefined) {
      return 'telah dimasukkan';
    }
    switch(type) {
      case 'error':
        return 'telah dihapus';
      case 'info':
        return 'telah diubah';
      default:
        return 'telah dimasukkan';
    }
  }

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
      {props.flash?.message && (
        <NotificationKendaraan type={props.flash?.message.type} className={'absolute font-bold top-20 right-8'} open={notificationOpen} setOpen={setNotificationOpen}>
          {`${props.flash?.message.plat_nomor} ${props.flash?.message.merk_mobil}, ${props.flash?.message.nama_mobil} ${messageNotification(props.flash?.message.type)}`}
        </NotificationKendaraan>
      )}
    </AuthenticatedLayout>
  );
};

export default Kendaraan;