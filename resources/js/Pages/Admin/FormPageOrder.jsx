import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import FormOrder from '@/Components/Admin/Order/FormOrder';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import React from 'react';

const FormPageOrder = (props) => {
  const { url } = usePage();
  console.log(props.data_order);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
    >
      <Head title="Create Order" />
      <HeaderAdmin
        title={'Travel Order ⏭️'}
        url={url}
      />
      <FormOrder
        type={props.type}
        layananData={props.layananData}
      />
    </AuthenticatedLayout>
  );
};

export default FormPageOrder;