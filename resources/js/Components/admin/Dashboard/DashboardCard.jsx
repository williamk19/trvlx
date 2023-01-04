import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const DashboardCard = ({ id, imgUrl, title, count, url }) => {
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
            <div className="flex space-x-3">
              <div className="flex items-center text-slate-400">
                <svg className="w-5 h-5 shrink-0 fill-current mr-1.5" viewBox="0 0 16 16">
                  <path d="M14.14 9.585a2.5 2.5 0 00-3.522 3.194c-.845.63-1.87.97-2.924.971a4.979 4.979 0 01-1.113-.135 4.436 4.436 0 01-1.343 1.682 6.91 6.91 0 006.9-1.165 2.5 2.5 0 002-4.547h.002zM10.125 2.188a2.5 2.5 0 10-.4 2.014 5.027 5.027 0 012.723 3.078c.148-.018.297-.028.446-.03a4.5 4.5 0 011.7.334 7.023 7.023 0 00-4.469-5.396zM4.663 10.5a2.49 2.49 0 00-1.932-1.234 4.624 4.624 0 01-.037-.516 4.97 4.97 0 011.348-3.391 4.456 4.456 0 01-.788-2.016A6.989 6.989 0 00.694 8.75c.004.391.04.781.11 1.166a2.5 2.5 0 103.86.584z" />
                </svg>
                <div className="ml-2 text-xl font-bold text-slate-800">{count}</div>
              </div>
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