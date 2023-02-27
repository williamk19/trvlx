import { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import PaginationKendaraan from '../Kendaraan/PaginationKendaraan';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from '@inertiajs/inertia-react';

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

  const ListSchedule = ({id, sopir, kendaraan, waktu, status}) => {
    return (
      <tr key={id}>
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
      {data.length > 0 && data?.map((l) => (
        <div key={l.id} data-theme="light" className="overflow-x-auto mb-5 rounded-xl shadow-lg w-full">
          <div className='pl-5 py-3 bg-gray-100'>
            <div className="font-bold flex gap-3">
              {l.kota_asal} <ArrowRightIcon className='w-4' /> {l.kota_tujuan}
            </div>
          </div>
          <table className="table w-full rounded-t-none">
            <thead>
              <tr>
                <th className='text-sm w-2/12 font-bold'>Waktu</th>
                <th className='text-sm w-3/12 font-bold'>Sopir</th>
                <th className='text-sm font-bold w-4/12'>Kendaraan</th>
                <th className='text-sm font-bold'>
                  Status
                  </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {l.schedules?.map((schedule) => (
                <ListSchedule
                  id={schedule.id}
                  sopir={schedule.sopir}
                  kendaraan={schedule.kendaraan}
                  waktu={schedule.waktu}
                  status={schedule.status} />
              ))}
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
