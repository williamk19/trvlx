import React from 'react';
import SearchForm from '../core/SearchForm';

const HeaderKendaraan = () => {
  return (
    <div className="py-3">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            Kendaraan 🚗
          </h1>
        </div>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end items-center gap-2">
          <SearchForm placeholder="Search by invoice ID…" />
          <button className="btn rounded-md border-none bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Tambah Kendaraan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderKendaraan;