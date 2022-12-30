import React from 'react';
import CurrencyFormat from 'react-currency-format';

const PaymentTrigger = ({ order, handlePayment }) => {
  const statusColor = (type) => {
    switch (type) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-600';
      case 'pending':
        return 'bg-amber-100 text-amber-600';
      case 'rejected':
        return 'bg-rose-100 text-rose-600';
      case 'init':
        return 'bg-sky-100 text-sky-600';
      case 'done':
        return 'bg-indigo-100 text-indigo-600';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className='basis-5/12 lg:basis-5/12 xl:basis-3/12'>
      <div className="bg-white p-5 shadow-lg rounded-xl border border-slate-200">
        <div className="text-slate-800 font-semibold mb-2">Pembayaran</div>
        <ul className="mb-4">
          <li className="text-base w-full flex justify-between py-3 border-b border-slate-200">
            <div className='text-gray-500'>Biaya Total Travel</div>
            <div className="font-semibold text-slate-800">
              <CurrencyFormat value={order.total_harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />
            </div>
          </li>
          <li className="text-base w-full flex justify-between py-3 border-b border-slate-200">
            <div className='text-gray-500'>Status Pembayaran</div>
            <div className="font-semibold text-slate-800">
              <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(order.status_pembayaran)}`}>
                {order.status_pembayaran}
              </div>
            </div>
          </li>
        </ul>
        <div className="mb-4">
          <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white border-none shadow-lg" onClick={handlePayment}>
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTrigger;