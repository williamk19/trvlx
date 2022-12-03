import React from 'react';
import { Link } from '@inertiajs/inertia-react';

function CardUser(props) {
  const categoryIcon = (category) => {
    switch (category) {
      case '1':
        return (
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-500">
            <svg className="w-9 h-9 fill-current text-rose-50" viewBox="0 0 36 36">
              <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z" />
            </svg>
          </div>
        );
      case '2':
        return (
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-500">
            <svg className="w-9 h-9 fill-current text-emerald-50" viewBox="0 0 36 36">
              <path d="M15 13v-3l-5 4 5 4v-3h8a1 1 0 000-2h-8zM21 21h-8a1 1 0 000 2h8v3l5-4-5-4v3z" />
            </svg>
          </div>
        );
      case '3':
        return (
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-sky-500">
            <svg className="w-9 h-9 fill-current text-sky-50" viewBox="0 0 36 36">
              <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z" />
            </svg>
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
            {categoryIcon(props.category)}
            <div className="flex shrink-0 -space-x-3 -ml-px">
            </div>
          </div>
        </header>
        <div className="grow mt-4">
          <Link className="inline-flex text-slate-800 hover:text-slate-900 mb-1" to={props.link}>
            <h2 className="text-xl leading-snug font-semibold">{props.title}</h2>
          </Link>
          <div className="text-base text-gray-600">{props.content}</div>
        </div>
        <footer className="mt-5">
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-sm font-bold text-gray-600 inline-flex font-medium rounded-full text-center`}>{props.total} Pengguna</div>
            </div>
            <div>
              <Link className="flex gap-1 items-center text-sm font-medium text-indigo-500 hover:text-indigo-600" href={route(props.link)}>
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
}

export default CardUser;
