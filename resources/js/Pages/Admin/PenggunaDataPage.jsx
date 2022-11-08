import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import TableUser from '@/Components/User/TableUser';
import HeaderAdmin from '@/Components/User/HeaderAdmin';

export default function Pengguna(props) {
  let { url } = usePage();
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(props.user);
  const [notificationOpen, setNotificationOpen] = useState(true);

  useEffect(() => {
    const temp = props.user.filter((k) => (
      k.nama_user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.email_user.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    setUser(temp);
  }, [searchQuery]);

  useEffect(() => {
    if (notificationOpen === true) {
      setTimeout(() => {
        setNotificationOpen(false);
      }, 5000);
    }
  }, [notificationOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

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
        handleSearch={handleSearch}
      />
      <div className="py-8">
        <div className="mx-auto">
          <TableUser user={user} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
