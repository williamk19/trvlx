import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import TableUser from '@/Components/Admin/User/TableUser';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import NotificationKendaraan from '@/Components/Admin/NotificationAdmin';
import { Inertia } from '@inertiajs/inertia';

export default function Pengguna(props) {
  const [searchQuery, setSearchQuery] = useState(props.query);
  const [notificationOpen, setNotificationOpen] = useState(true);

  let { url } = usePage();
  const base_url = url.split("?").slice(0, 1).join();

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
        title='Pengguna Travel 👤'
        url={url}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <div className="py-8">
        <div className="mx-auto">
          {props.flash?.message && (
            <NotificationKendaraan type={props.flash?.message.type} className={'absolute font-bold top-20 right-8'} open={notificationOpen} setOpen={setNotificationOpen}>
              {props.flash.message.id
                ? `${props.flash?.message.nama_user} telah dihapus`
                : `${props.flash?.message}`}
            </NotificationKendaraan>
          )}
          <TableUser query={searchQuery} user={props.user} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
