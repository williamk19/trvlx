import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import FormOrder from '@/Components/admin/Order/FormOrder';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
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
        title={`${props.edit ? 'Edit' : 'Tambah'} Travel Order ⏭️`}
        url={url}
      />
      <FormOrder
        orderId={props.orderId || null}
        type={props.type}
        edit={props.edit}
        jadwalData={props.jadwalData}
        orderEdit={props.orderEdit}
        dateStart={props.dateStart}
        seatSisa={props.seatSisa}
        seatTotal={props.seatTotal}
        seatTerpesan={props.seatSelected}
      />
    </AuthenticatedLayout>
  );
};

export default FormPageOrder;
