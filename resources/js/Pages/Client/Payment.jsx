import HeaderAdmin from '@/Components/admin/HeaderAdmin';
import PaymentDetails from '@/Components/Client/Payment/PaymentDetails';
import PaymentTrigger from '@/Components/Client/Payment/PaymentTrigger';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

const Payment = (props) => {
  const { url } = usePage();

  const handlePayment = (e) => {
    e.preventDefault();
    if (props.snapToken) {
      let snapToken = props.snapToken;
      snap.pay(snapToken, {
        onSuccess: function (result) {
          return router.reload({
            preserveScroll: true
          });
        },
        onPending: function (result) {
          return router.reload({
            preserveScroll: true
          });
        },
        onError: function (result) {
          return router.reload({
            preserveScroll: true
          });
        },
        onClose: function () {
          return router.reload({
            preserveScroll: true
          });
        }
      });
    }
  };

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
      <div className='flex flex-col-reverse md:flex-row w-full gap-5'>
        <PaymentDetails order={props.order} />
        <PaymentTrigger order={props.order} handlePayment={handlePayment} />
      </div>
    </AuthenticatedLayout>
  );
};

export default Payment;
