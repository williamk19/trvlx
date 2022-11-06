import React, { useState, useEffect } from 'react';
import PaginationKendaraan from './PaginationKendaraan';

const TableKendaraan = ({ kendaraan }) => {
  const [data, setData] = useState(kendaraan);
  const [currPage, setCurrPage] = useState(1);
  const [elementPerPage, setElementPerPage] = useState(5);

  useEffect(() => {
    
  })

  const lastIndexItem = currPage * elementPerPage;
  const firstIndexItem = lastIndexItem - elementPerPage;
  console.log(lastIndexItem, firstIndexItem);
  const currentData = data.slice(firstIndexItem, lastIndexItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / elementPerPage); i++) {
    pageNumbers.push(i);
  }

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

  const renderData = currentData.map((k) => {
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
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    );
  });

  return (
    <>
      <div data-theme="light" className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nama Kendaraan</th>
              <th>Plat Nomor</th>
              <th>Jumlah Seat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renderData}
          </tbody>
          <tfoot>
            <tr>
              <th>Nama Kendaraan</th>
              <th>Plat Nomor</th>
              <th>Jumlah Seat</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-8">
        <PaginationKendaraan
          firstIndex={firstIndexItem}
          lastIndex={lastIndexItem}
          dataLength={kendaraan.length}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableKendaraan;