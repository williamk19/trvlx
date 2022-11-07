import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderKendaraan from '@/Components/Kendaraan/HeaderKendaraan';
import TableKendaraan from '@/Components/Kendaraan/TableKendaraan';
import NotificationKendaraan from '@/Components/Kendaraan/NotificationKendaraan';

const Kendaraan = (props) => {
  console.log(props);
  const [searchQuery, setSearchQuery] = useState('');
  const [kendaraan, setKendaraan] = useState(props.kendaraan);
  const [notificationOpen, setNotificationOpen] = useState(true);
  let { url } = usePage();

  useEffect(() => {
    const temp = props.kendaraan.filter((k) => (
      k.nama_mobil.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.merk_mobil.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    setKendaraan(temp);
  }, [searchQuery]);

  useEffect(() => {
    if (notificationOpen === true) {
      setTimeout(() => {
        setNotificationOpen(false);
      }, 5000);
    }
  }, [notificationOpen])

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

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
      <HeaderKendaraan
        url={url}
        handleSearch={handleSearch}
      />
      <TableKendaraan kendaraan={kendaraan} />
      {props.flash?.message && (
        <NotificationKendaraan type={props.flash?.message.type} className={'absolute font-bold top-20 right-8'} open={notificationOpen} setOpen={setNotificationOpen}>
          {`${props.flash?.message.plat_nomor} ${props.flash?.message.merk_mobil}, ${props.flash?.message.nama_mobil} ${messageNotification(props.flash?.message.type)}`}
        </NotificationKendaraan>
      )}
    </AuthenticatedLayout>
  );
};

export default Kendaraan;