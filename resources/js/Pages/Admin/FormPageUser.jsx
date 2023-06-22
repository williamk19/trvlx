import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HeaderKendaraan from '@/Components/admin/HeaderAdmin';
import { usePage } from '@inertiajs/react';
import FormAddUser from '@/Components/admin/User/FormAddUser';

const FormPageKendaraan = (props) => {
  let { url } = usePage();

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Tambah atau Edit User
      </h2>}
    >
      <Head title="Tambah atau Edit User" />
      <HeaderKendaraan title={'Tambah atau Edit User'} url={url} />
      <FormAddUser itemUser={props.itemUser} auth={props.auth} />
    </AuthenticatedLayout>
  );
};

export default FormPageKendaraan;
