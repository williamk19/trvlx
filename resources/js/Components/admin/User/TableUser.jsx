import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';

const TableUser = ({ user, query }) => {
  const [data, setData] = useState(user.data);
  const [prevUrl, setPrevUrl] = useState(user.prev_page_url);
  const [nextUrl, setNextUrl] = useState(user.next_page_url);

  useEffect(() => {
    setData(user.data);
  }, [user.data]);

  const handleNextClick = () => {
    if (nextUrl === null)
      return;

    if (query) {
      Inertia.get(`${nextUrl}&search=${query}`, {}, {
        replace: true
      });
    } else if (nextUrl !== null) {
      Inertia.get(nextUrl, {}, {
        replace: true
      });
    }
  };

  const handlePrevClick = () => {
    if (prevUrl === null)
      return;

    if (query) {
      Inertia.get(`${prevUrl}&search=${query}`, {}, {
        replace: true
      });
    } else if (prevUrl !== null) {
      Inertia.get(prevUrl, {}, {
        replace: true
      });
    }
  };

  const pathMapping = (id) => {
    switch (id) {
      case 1:
        return '/admin';
      case 2:
        return '/admin';
      case 3:
        return '/sopir';
      case 4:
        return '/pengguna';
      default:
        return '/pengguna';
    }
  };

  const renderData = data ? data.map((k) => {
    return (
      <tr key={k.id}>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{k.nama_user}</div>
            </div>
          </div>
        </td>
        <td>
          {k.email_user}
        </td>
        <td>{k.telepon_user}</td>
        <th>
          <Link
            href={`/user${pathMapping(k.id_kategori)}/${k.id}/edit`}
            className="btn bg-indigo-400 border-none hover:bg-indigo-500 btn-xs">
            Edit
          </Link>
        </th>
      </tr>
    );
  }) : (
    <tr className='text-center'>
      <td></td>
      <td>Data Tidak Ditemukan</td>
      <td></td>
    </tr>
  );

  return (
    <>
      <div data-theme="light" className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nama User</th>
              <th>Email User</th>
              <th>Telepon User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderData}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <PaginationKendaraan
          firstIndex={user.from}
          lastIndex={user.to}
          dataLength={user.total}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableUser;