import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import SearchForm from '../core/SearchForm';

const HeaderAdmin = ({ title, handleSearch, url }) => {
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
            {title}
          </h1>
        </div>
        {handleSearch ? (
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end items-center gap-2">
            <SearchForm handleSearch={handleSearch} placeholder="Cari nama atau email user..." />
          </div>
        ) : (<div></div>)}
      </div>
    </div>
  );
};

export default HeaderAdmin;