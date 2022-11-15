import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import PaginationKendaraan from './PaginationKendaraan';

const TableKendaraan = ({ kendaraan }) => {
  const [data, setData] = useState(kendaraan);
  const [currData, setCurrData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [elementPerPage, setElementPerPage] = useState(5);
  const [lastIndex, setLastIndex] = useState(currPage * elementPerPage);
  const [firstIndex, setFirstIndex] = useState(lastIndex - elementPerPage);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    setData(kendaraan);
    setCurrPage(1);
  }, [kendaraan]);

  useEffect(() => {
    setCurrData(data.slice(firstIndex, lastIndex));
    let tempPageNumber = [];
    for (let i = 1; i <= Math.ceil(data.length / elementPerPage); i++) {
      tempPageNumber.push(i)
    }
    setPageNumbers(tempPageNumber);
  }, [data, firstIndex, lastIndex]);

  useEffect(() => {
    setLastIndex(currPage * elementPerPage);
    setFirstIndex(lastIndex - elementPerPage);
  }, [pageNumbers, currPage])

  const handleNextClick = () => {
    if (currPage <= pageNumbers.length - 1) {
      setCurrPage(currPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currPage >= 2) {
      setCurrPage(currPage - 1);
    }
  };

  const renderData = currData.length > 0 ? currData.map((k) => {
    return (
      <tr key={k.id}>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-bold">{k.merk_mobil}, {k.nama_mobil}</div>
            </div>
          </div>
        </td>
        <td>
          {k.plat_nomor}
        </td>
        <td>{k.jumlah_seat} Penumpang</td>
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
              <th className='text-base'>Nama Kendaraan</th>
              <th className='text-base'>Plat Nomor</th>
              <th className='text-base'>Jumlah Seat</th>
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
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          dataLength={kendaraan.length}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableKendaraan;