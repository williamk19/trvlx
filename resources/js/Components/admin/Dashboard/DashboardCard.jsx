import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const DashboardCard = ({ id, imgUrl, title, count, doneCount, url }) => {
  console.log(doneCount);
  const colors = [
    'from-amber-500 to-amber-300',
    'from-emerald-500 to-emerald-300',
    'from-sky-500 to-sky-300',
  ];

  return (
    <div className="col-span-full flex-1 xl:col-span-6 2xl:col-span-4 bg-white shadow-md border border-slate-200 rounded-xl">
      <div className="flex flex-col h-full p-5">
        <div className="grow">
          <header className="flex items-center mb-4">
            <div className={`w-9 md:w-12 h-9 md:h-12 rounded-full shrink-0 bg-gradient-to-tr ${colors[id]} mr-3 flex`}>
              <img className='w-5 md:w-7 h-5 md:h-7 m-auto' src={imgUrl} />
            </div>
            <h3 className="text-md md:text-lg text-slate-800 font-semibold">{title}</h3>
          </header>
        </div>
        <footer className="mt-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex gap-3 md:flex-col 2xl:flex-row">
              <div className="flex items-center text-slate-400">
                <p className='text-gray-600'>Total</p>
                <div className="ml-2 text-xl font-bold text-slate-800">{count}</div>
              </div>
              {doneCount <= 0 && (
                <div className="flex items-center text-slate-400">
                  <p className='text-gray-600'>Perlu Konfirmasi</p>
                  <div className="ml-2 text-xl font-bold text-slate-800">{doneCount}</div>
                </div>
              )}
              
            </div>
            <Link href={url}>
              <button className="btn-sm text-black bg-sky-200 hover:bg-sky-300 transition-colors shadow-md rounded-md flex items-center">
                View
                <span className='text-gray-700 ml-2'>
                  <ArrowTopRightOnSquareIcon className='w-4 h-4' />
                </span>
              </button>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardCard;