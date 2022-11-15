import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import HeaderKendaraan from '@/Components/Admin/HeaderAdmin';
import { usePage } from '@inertiajs/inertia-react';
import FormAddUser from '@/Components/Admin/User/FormAddUser';

const FormPageKendaraan = (props) => {
  let { url } = usePage();

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Kendaraan</h2>}
    >
      <Head title="Tambah Kendaraan" />
      <HeaderKendaraan title={'Tambah Kendaraan'} url={url} />
      <FormAddUser itemUser={props.itemUser} auth={props.auth} />
    </AuthenticatedLayout>
  );
};

export default FormPageKendaraan;