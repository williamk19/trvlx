import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import TableKendaraan from '@/Components/Admin/Kendaraan/TableKendaraan';
import NotificationKendaraan from '@/Components/Admin/NotificationAdmin';
import BoxMap from '@/Components/MapBox/BoxMap';

const Order = (props) => {
  let { url } = usePage();

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kendaraan</h2>}
    >
      <Head title="Travel Order" />
      <HeaderAdmin
        title='Travel Order 🚗'
        url={url}
        // handleSearch={handleSearch}
        addButton={true}
        buttonLink={route('kendaraan.create')}
      />
      <div className='flex gap-10'>
        <BoxMap />
      </div>
    </AuthenticatedLayout>
  );
};

export default Order;