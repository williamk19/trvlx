import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';

const TableUser = ({ user }) => {
  const [data, setData] = useState(user);
  const [currData, setCurrData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [elementPerPage, setElementPerPage] = useState(5);
  const [lastIndex, setLastIndex] = useState(currPage * elementPerPage);
  const [firstIndex, setFirstIndex] = useState(lastIndex - elementPerPage);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    setData(user);
    setCurrPage(1);
  }, [user]);

  useEffect(() => {
    setCurrData(data.slice(firstIndex, lastIndex));
    let tempPageNumber = [];
    for (let i = 1; i <= Math.ceil(data.length / elementPerPage); i++) {
      tempPageNumber.push(i);
    }
    setPageNumbers(tempPageNumber);
  }, [data, firstIndex, lastIndex]);

  const renderData = currData.length > 0 ? currData.map((k) => {
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
            href={`/kendaraan/${k.id}/edit`}
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
          <tfoot>
            <tr>
              <th>Nama User</th>
              <th>Email User</th>
              <th>Telepon User</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-8">
        <PaginationKendaraan
        // firstIndex={firstIndex}
        // lastIndex={lastIndex}
        // dataLength={kendaraan.length}
        // handleNextClick={handleNextClick}
        // handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableUser;