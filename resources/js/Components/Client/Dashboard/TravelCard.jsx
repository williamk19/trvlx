import { ArrowSmallRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/inertia-react';

const TravelCard = ({
  id,
  namaPenumpang,
  statusPembayaran,
  kotaAsal,
  kotaTujuan,
  tanggalPemberangkatan
}) => {
  const statusColor = (type) => {
    switch (type) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-600';
      case 'pending':
        return 'bg-amber-100 text-amber-600';
      case 'failed':
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
    <div className="col-span-full sm:col-span-6 xl:col-span-4 from-emerald-200 bg-white shadow-md rounded-xl border border-gray-400">
      <div className="flex flex-col h-full p-5">
        <div className="grow mt-2">
          <Link className="inline-flex text-slate-800 hover:text-slate-900 mb-1" href={`/client-order/payment/${id}`}>
            <h2 className="text-xl leading-snug font-semibold">
              {namaPenumpang}
            </h2>
          </Link>
          <div className="text-sm font-semibold">
            {tanggalPemberangkatan}
          </div>
        </div>
        <footer className="mt-2">
          <div className="text-sm flex items-center gap-1 font-medium text-slate-600 mb-2">
            {kotaAsal}
            <ArrowSmallRightIcon className='w-4 h-4' />
            {kotaTujuan}
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-xs inline-flex font-medium rounded-full text-center px-2.5 py-1 ${statusColor(statusPembayaran)}`}>
                {statusPembayaran}
              </div>
            </div>
            <div>
              <Link className="text-sm flex items-center gap-1.5 font-medium text-indigo-500 hover:text-indigo-600" href={`/client-order/payment/${id}`}>
                Lihat <ArrowTopRightOnSquareIcon className='w-4 h-4' />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TravelCard;