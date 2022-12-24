import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import note from '@/assets/icon/note.svg'
import table from '@/assets/icon/table.svg'

const CardOrder = ({ category, title, link, content, ...props }) => {
  const categoryIcon = (category) => {
    switch (category) {
      case '1':
        return (
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-amber-500">
            <img className='w-6 h-6' src={note} />
          </div>
        );
      case '2':
        return (
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-500">
            <img className='w-6 h-6' src={table} />
          </div>
        );
      default:
        return (<div></div>);
    }
  };

  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col h-full p-5">
        <header>
          <div className="flex items-center justify-between">
            {categoryIcon(category)}
            <div className="flex shrink-0 -space-x-3 -ml-px">
            </div>
          </div>
        </header>
        <div className="grow mt-4">
          <Link className="inline-flex text-slate-800 hover:text-slate-900 mb-1">
            <h2 className="text-xl leading-snug font-semibold">{title}</h2>
          </Link>
          <div className="text-base text-gray-600">{content}</div>
        </div>
        <footer className="mt-5">
          <div className="flex justify-between items-center">
            <div></div>
            <div>
              <Link className="flex gap-1 items-center text-sm font-medium text-indigo-500 hover:text-indigo-600" href={route(link)}>
                View
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CardOrder;