import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/react';

const TableJadwal = ({ jadwal, query }) => {
  const [data, setData] = useState(jadwal.data);
  const [prevUrl, setPrevUrl] = useState(jadwal.prev_page_url);
  const [nextUrl, setNextUrl] = useState(jadwal.next_page_url);

  useEffect(() => {
    setData(jadwal.data);
    setPrevUrl(jadwal.prev_page_url);
    setNextUrl(jadwal.next_page_url);
  }, [jadwal.data, jadwal.prev_page_url, jadwal.next_page_url]);

  const handleNextClick = () => {
    if (nextUrl === null)
      return;

    if (query) {
      router.get(`${nextUrl}&search=${query}`, {}, {
        replace: true
      });
    } else if (nextUrl !== null) {
      router.get(nextUrl, {}, {
        replace: true
      });
    }
  };

  const handlePrevClick = () => {
    if (prevUrl === null)
      return;

    if (query) {
      router.get(`${prevUrl}&search=${query}`, {}, {
        replace: true
      });
    } else if (prevUrl !== null) {
      router.get(prevUrl, {}, {
        replace: true
      });
    }
  };

  const ListSchedule = ({ id, sopir, kendaraan, waktu, status }) => {
    return (
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-semibold flex gap-3">
                {waktu.split(':').slice(0, -1).join(':')}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-semibold flex gap-3">
                {sopir.nama_user}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-semibold flex gap-3">
                {kendaraan.plat_nomor} - {kendaraan.merk_mobil}, {kendaraan.nama_mobil}
              </div>
            </div>
          </div>
        </td>
        <td>
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-semibold flex gap-3">
                {status}
              </div>
            </div>
          </div>
        </td>
        <td>
          <Link
            href={`/jadwal/${id}/edit`}
            className="btn bg-indigo-400 border-none hover:bg-indigo-500 btn-xs">
            Edit
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <>
      {data.length === 0 && (
        <div className='p-5 bg-white rounded-lg shadow-lg'>
          <h1 className='text-base md:text-lg text-gray-700 font-semibold'>
            Data Belum Ditemukan
          </h1>
        </div>
      )}
      {data.length > 0 && data?.map((l) => (
        <div key={l.id} data-theme="light" className="overflow-x-auto mb-5 rounded-xl shadow-lg w-full">
          <div className='pl-5 py-3 bg-gray-100'>
            <div className="font-bold flex gap-3">
              {l.kota_asal} <ArrowRightIcon className='w-4' /> {l.kota_tujuan}
            </div>
          </div>
          <table className="table w-full !rounded-t-none border border-t-gray-200">
            <thead className='!bg-gray-100'>
              <tr>
                <th className='text-sm w-2/12 font-bold !bg-gray-100'>Waktu</th>
                <th className='text-sm w-3/12 font-bold !bg-gray-100'>Sopir</th>
                <th className='text-sm font-bold w-4/12 !bg-gray-100'>Kendaraan</th>
                <th className='text-sm font-bold !bg-gray-100'>
                  Status
                </th>
                <th className='text-sm font-bold !bg-gray-100'></th>
              </tr>
            </thead>
            <tbody>
              {l.schedules?.map((schedule) => (
                <ListSchedule
                  key={schedule.id}
                  id={schedule.id}
                  sopir={schedule.sopir}
                  kendaraan={schedule.kendaraan}
                  waktu={schedule.waktu}
                  status={schedule.status} />
              ))}
              {l.schedules.length <= 0 && (
                <tr>
                  <td></td>
                  <td></td>
                  <td>Jadwal Belum Ada</td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
      <div className="mt-8">
        <PaginationKendaraan
          firstIndex={jadwal.from}
          lastIndex={jadwal.to}
          dataLength={jadwal.total}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      </div>
    </>
  );
};

export default TableJadwal;
