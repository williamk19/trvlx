import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import CurrencyFormat from 'react-currency-format';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';

const TableLayanan = ({ layanan, query }) => {
  const [data, setData] = useState(layanan.data);
  const [prevUrl, setPrevUrl] = useState(layanan.prev_page_url);
  const [nextUrl, setNextUrl] = useState(layanan.next_page_url);

  useEffect(() => {
    setData(layanan.data);
    setPrevUrl(layanan.prev_page_url);
    setNextUrl(layanan.next_page_url);
  }, [layanan.data, layanan.prev_page_url, layanan.next_page_url]);

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

  const renderData = data.length > 0 ? data.map((l) => {
    return (
      <tr key={l.id}>
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
            href={`/layanan/${l.id}/edit`}
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
      <div data-theme="light" className="overflow-x-auto rounded-xl shadow-lg w-full">
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
          firstIndex={layanan.from}
          lastIndex={layanan.to}
          dataLength={layanan.total}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableLayanan;
