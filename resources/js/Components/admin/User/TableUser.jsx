import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';
import { replace } from 'lodash';

const TableUser = ({ user }) => {
  // console.log(user);
  const [data, setData] = useState(user.data);
  const [links, setLinks] = useState(user.links);
  const [prevUrl, setPrevUrl] = useState(user.prev_page_url);
  const [nextUrl, setNextUrl] = useState(user.next_page_url);
  // const [currPage, setCurrPage] = useState(1);
  // const [elementPerPage, setElementPerPage] = useState(5);
  // const [lastIndex, setLastIndex] = useState(currPage * elementPerPage);
  // const [firstIndex, setFirstIndex] = useState(lastIndex - elementPerPage);
  // const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    setData(user.data);
    // setCurrPage(1);
    // console.log(data);
  }, [user.data]);

  // useEffect(() => {
  //   setCurrData(data);
    // console.log(currData);
    // let tempPageNumber = [];
    // for (let i = 1; i <= Math.ceil(data.length / elementPerPage); i++) {
    //   tempPageNumber.push(i);
    // }
    // setPageNumbers(tempPageNumber);
  // }, [data]);


  const handleNextClick = () => {
    // if (currPage <= pageNumbers.length - 1) {
    //   setCurrPage(currPage + 1);
    // }
    Inertia.get(nextUrl, {}, {
      replace: true
    });
  };

  const handlePrevClick = () => {
    // if (currPage >= 2) {
    //   setCurrPage(currPage - 1);
    // }
    Inertia.get(prevUrl, {}, {
      replace: true
    });
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