import HeaderAdmin from '@/Components/Admin/HeaderAdmin';
import FormOrder from '@/Components/Admin/Order/FormOrder';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import React from 'react';

const FormPageOrder = (props) => {
  const { url } = usePage();

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
    >
      <Head title="Create Order" />
      <HeaderAdmin
        title={'Travel Order ⏩'}
        url={url}
      />
      <FormOrder
        itemLayanan={props.layanan}
      />
    </AuthenticatedLayout>
  );
};

export default FormPageOrder;