import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import CardUser from '@/Components/admin/User/CardUser';
import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import NotificationKendaraan from '@/Components/admin/Kendaraan/NotificationKendaraan';

export default function Pengguna(props) {
  let { url } = usePage();
  const [notificationOpen, setNotificationOpen] = useState(true);

  useEffect(() => {
    if (notificationOpen === true) {
      setTimeout(() => {
        setNotificationOpen(false);
      }, 5000);
    }
  }, [notificationOpen]);

  const messageNotification = (type) => {
    if (type === undefined) {
      return 'telah dimasukkan';
    }
    switch (type) {
      case 'error':
        return 'telah dihapus';
      case 'info':
        return 'telah diubah';
      default:
        return 'telah dimasukkan';
    }
  }

  const items = [
    {
      id: 0,
      category: '1',
      title: 'Admin Travel',
      link: 'user.admin',
      content: 'Pengelola user admin travel',
      total: props.totalAdmin
    },
    {
      id: 1,
      category: '2',
      title: 'Sopir Travel',
      link: 'user.sopir',
      content: 'Pengelola user sopir travel',
      total: props.totalSopir
    },
    {
      id: 3,
      category: '3',
      title: 'Pengguna Travel',
      link: 'user.pengguna',
      content: 'Pengelola user pengguna atau pelanggan travel',
      total: props.totalPengguna
    }
  ];

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
        showSide={false}
      />
      <div className="py-8">
        <div className="mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {props.flash?.message && (
              <NotificationKendaraan type={props.flash?.message.type} className={'absolute font-bold top-20 right-8'} open={notificationOpen} setOpen={setNotificationOpen}>
                {props.flash.message.id 
                  ? `${props.flash?.message.nama_user} telah dihapus` 
                  : `${props.flash?.message}`}
              </NotificationKendaraan>
            )}
            {items.map((item) => (
              <CardUser
                key={item.id}
                id={item.id}
                category={item.category}
                title={item.title}
                link={item.link}
                content={item.content}
                total={item.total}
              />
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
