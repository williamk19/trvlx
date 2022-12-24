import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import SearchForm from '../Core/SearchForm';

const HeaderAdmin = ({
  title,
  handleSearch,
  searchQuery,
  url,
  placeholder = "Cari sesuatu...",
  type,
  buttonLink,
  addButton = false
}) => {
  const nameTransform = (url) => {
    let name = url.split("?").slice(0, 1).join('');
    return name.split("-").join(' ');
  };

  const toBreadcrumbs = (pathname, nameTransform, { rootName = "Home" } = {}) =>
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

  const arrOfPath = toBreadcrumbs(url, nameTransform).filter((p) => {
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
      <div className="flex justify-start md:justify-between flex-col md:flex-row mb-8">
        <div className="flex items-center md:items-start">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
            {title}
          </h1>
        </div>
        {
          (handleSearch || addButton) && (
            <div className="grid grid-flow-col mt-8 md:mt-0 sm:auto-cols-max justify-start md:justify-end items-center gap-2">
              {handleSearch && (
                <SearchForm handleSearch={handleSearch} placeholder={placeholder} searchQuery={searchQuery} />
              )}
              {addButton && (
                <Link href={buttonLink}>
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 border-none text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Tambahkan</span>
                  </button>
                </Link>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default HeaderAdmin;