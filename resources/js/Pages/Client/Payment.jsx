import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';

const Payment = (props) => {
  const { url } = usePage();

  useEffect(() => {
    if (props.snapToken) {
      let snapToken = props.snapToken;
      snap.pay(snapToken, {
        onSuccess: function (result) {
          console.log('success');
          console.log(result);
        },
        onPending: function (result) {
          console.log('pending');
          console.log(result);
        },
        onError: function (result) {
          console.log('error');
          console.log(result);
        },
        onClose: function () {
          console.log('customer closed the popup without finishing the payment');
        }
      });
    }
    console.log(props);
  }, []);

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
    >
      <Head title="Create Order" />
      <HeaderAdmin
        title={'Travel Order Payment ⏩'}
        url={url}
      />
    </AuthenticatedLayout>
  );
};

export default Payment;