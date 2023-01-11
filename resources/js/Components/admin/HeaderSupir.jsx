import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const HeaderSupir = ({ url, className }) => {
  const nameTransform = (url) => {
    let name = url.split("?").slice(0, 1).join('');
    return name.split("-").join(' ');
  };

  const toBreadcrumbs = (pathname, nameTransform, { rootName = "Home" } = {}) => {
    const pathDetail = pathname?.split('?')[1];
    const pathDate = pathDetail?.split('&')[0];

    return pathname
      .split("/")
      .filter(Boolean)
      .reduce(
        (acc, curr, idx, arr) => {
          acc.path += `/${curr}`;
          if (curr !== 'sopir') {
            if (curr === 'detail') {
              acc.crumbs.push({
                path: acc.path + '?' + pathDetail,
                name: nameTransform(curr),
              });
            } else if (curr === 'dashboard' && pathDate) {
              acc.crumbs.push({
                path: acc.path + '?' + pathDate,
                name: nameTransform(curr),
              });
            } else {
              acc.crumbs.push({
                path: acc.path,
                name: nameTransform(curr),
              });
            }
            
          } 

          if (idx === arr.length - 1) return acc.crumbs;
          else return acc;
        },
        { path: "", crumbs: [{ path: "/", name: rootName }] },
      );
  };


  const arrOfPath = toBreadcrumbs(url, nameTransform).filter((p) => {
    if (p.name !== "Home" && isNaN(p.name)) {
      return p;
    }
  });

  const toCapitalize = (text) => {
    return text[0].toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div className={`${className}`}>
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
    </div>
  );
};

export default HeaderSupir;