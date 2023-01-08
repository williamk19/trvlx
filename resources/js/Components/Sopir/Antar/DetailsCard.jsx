import { ChatBubbleBottomCenterIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/inertia-react';
import React from 'react';

const DetailsCard = ({ order }) => {
  console.log(order);
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-xl mb-4 last-of-type:mb-0 border border-slate-200">
      <div className="flex flex-col h-full">
        <div className="grow px-6 py-3">
          <div className="flex justify-between items-start">
            <header>
              <div className="flex mb-2">
                <Link className="relative text-slate-800 hover:text-slate-900 inline-flex items-start" to={order.nama_penumpang}>
                  <h2 className="text-base md:text-xl leading-snug justify-center font-semibold">{order.nama_penumpang}
                  </h2>
                </Link>
              </div>
            </header>
          </div>
          <div className="">
            <div className="text-xs md:text-sm text-slate-600">
              Kursi Dipesan : {order.total_seat}
            </div>
            <div className="text-xs md:text-sm text-slate-600">
              Alamat Asal : {order.lokasi.alamat_asal}
            </div>
            <div className="text-xs md:text-sm text-slate-600">
              <h1>
                Alamat Tujuan : {order.lokasi.alamat_asal}
              </h1>
            </div>
            <div className='mt-3 sm:flex sm:justify-end'>
              <a data-theme="light" href={`https://wa.me/${order.user.telepon_user}`} className="btn btn-sm bg-emerald-100 hover:bg-emerald-200 flex text-xs md:text-sm text-slate-800">
                {order.user.telepon_user}
                <ChatBubbleOvalLeftEllipsisIcon className='w-4 ml-2' />
              </a>
            </div>
          </div>
        </div>
        {/* <div className="border-t border-slate-200">
          <div className="flex divide-x divide-slate-200r">
            <Link className="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4" to="/messages">
              <div className="flex items-center justify-center">
                <ChatBubbleBottomCenterIcon className='w-3' />
                <span>Send Email</span>
              </div>
            </Link>
            <Link className="block flex-1 text-center text-sm text-slate-600 hover:text-slate-800 font-medium px-3 py-4 group" to="/settings">
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 fill-current text-slate-400 group-hover:text-slate-500 shrink-0 mr-2" viewBox="0 0 16 16">
                  <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                </svg>
                <span>Edit Profile</span>
              </div>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DetailsCard;