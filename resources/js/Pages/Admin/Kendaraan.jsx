import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import HeaderKendaraan from '@/Components/Kendaraan/HeaderKendaraan';
import TableKendaraan from '@/Components/Kendaraan/TableKendaraan';
import PaginationKendaraan from '@/Components/Kendaraan/PaginationKendaraan';

const Kendaraan = (props) => {
  console.log(props);
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kendaraan</h2>}
    >
      <Head title="Kendaraan" />
      <HeaderKendaraan />
      <TableKendaraan />
      <div className="mt-8">
        <PaginationKendaraan />
      </div>
    </AuthenticatedLayout>
  );
};

export default Kendaraan;