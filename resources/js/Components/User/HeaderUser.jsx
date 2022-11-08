import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import SearchForm from '../core/SearchForm';

const HeaderKendaraan = ({ title = "Kendaraan", handleSearch, url }) => {
  const toBreadcrumbs = (pathname, { rootName = "Home", nameTransform = s => s } = {}) =>
    pathname
      .split("/")
      .filter(Boolean)
      .reduce(
        (acc, curr, idx, arr) => {
          acc.path += `/${curr}`;
          acc.crumbs.push({
            path: acc.path,
            name: nameTransform(curr),
          });

          if (idx === arr.length - 1) return acc.crumbs;
          else return acc;
        },
        { path: "", crumbs: [{ path: "/", name: rootName }] },
      );

  const arrOfPath = toBreadcrumbs(url).filter((p) => {
    if (p.name !== "Home" && isNaN(p.name)) {
      return p;
    }
  });

  const toCapitalize = (text) => {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div className="py-3">
      <div className="text-sm text-gray-800 breadcrumbs">
        <ul>
          {arrOfPath.map((p, idx) => (
            <li key={idx}>
              <Link href={`${p.path}`} className="text-base">
                {toCapitalize(p.name.split("/").slice(-1)[0])}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            {title} 🚗
          </h1>
        </div>
        {handleSearch && (
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end items-center gap-2">
            <SearchForm handleSearch={handleSearch} placeholder="Cari nama mobil..." />
            <Link href="/kendaraan/create" className="btn rounded-md border-none bg-indigo-500 hover:bg-indigo-600 text-white">
              <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="hidden xs:block ml-2">Tambah Kendaraan</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderKendaraan;