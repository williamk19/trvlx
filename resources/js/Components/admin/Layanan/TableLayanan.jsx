import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import CurrencyFormat from 'react-currency-format';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';

const TableLayanan = ({ layanan }) => {
  const [data, setData] = useState(layanan);
  const [currData, setCurrData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [elementPerPage, setElementPerPage] = useState(5);
  const [lastIndex, setLastIndex] = useState(currPage * elementPerPage);
  const [firstIndex, setFirstIndex] = useState(lastIndex - elementPerPage);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    setData(layanan);
    setCurrPage(1);
  }, [layanan]);

  useEffect(() => {
    setCurrData(data.slice(firstIndex, lastIndex));
    let tempPageNumber = [];
    for (let i = 1; i <= Math.ceil(data.length / elementPerPage); i++) {
      tempPageNumber.push(i);
    }
    setPageNumbers(tempPageNumber);
  }, [data, firstIndex, lastIndex]);

  useEffect(() => {
    setLastIndex(currPage * elementPerPage);
    setFirstIndex(lastIndex - elementPerPage);
  }, [pageNumbers, currPage]);

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

  const renderData = currData.length > 0 ? currData.map((l) => {
    return (
      <tr key={l.id_layanan}>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-semibold">
                {l.kota_asal}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="font-semibold">
            {l.kota_tujuan}
          </div>
        </td>
        <td>
          <CurrencyFormat 
            value={l.biaya_jasa}
            displayType={'text'} 
            thousandSeparator={true}
            prefix={'Rp. '} />
        </td>
        <th>
          <Link
            href={`/kendaraan/${l.id_layanan}/edit`}
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
              <th className='text-base'>Kota Asal Travel</th>
              <th className='text-base'>Kota Tujuan Travel</th>
              <th className='text-base'>Harga</th>
              <th className='text-base'></th>
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
          dataLength={layanan.length}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableLayanan;