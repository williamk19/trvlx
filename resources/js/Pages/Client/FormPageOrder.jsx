import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import FormOrder from '@/Components/Client/Order/FormOrder';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import React from 'react';

const FormPageOrder = (props) => {
  const { url } = usePage();

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      url={url}
    >
      <Head title="Create Order" />
      <FormOrder
        nameAuth={props.auth.user.nama_user}
        type={props.type}
        layananData={props.layananData}
        dateStart={props.dateStart}
        seatSisa={props.seatSisa}
      />
    </AuthenticatedLayout>
  );
};

export default FormPageOrder;
