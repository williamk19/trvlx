import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import TableUser from '@/Components/User/TableUser';
import HeaderAdmin from '@/Components/core/HeaderAdmin';

export default function Pengguna(props) {
  let { url } = usePage();

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
          <TableUser user={props.user} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
