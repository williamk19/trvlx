import { MapPinIcon } from '@heroicons/react/24/solid';

const AntarJemputCard = ({ order, type = 'jemput' }) => {
  return (
    <div className="col-span-full sm:col-span-6 xl:col-span-4 w-52 bg-white rounded-xl mb-4 last-of-type:mb-0 border-slate-200">
      <div className="flex flex-col h-full">
        <div className="grow px-3 py-2">
          <div className="flex justify-between items-start">
            <header>
              <div className="flex mb-2">
                <div className="relative text-slate-800 hover:text-slate-900 inline-flex items-start">
                  <h2 className="text-base md:text-xl leading-snug justify-center font-semibold">{order.nama_penumpang}
                  </h2>
                </div>
              </div>
            </header>
          </div>
          {(type === 'jemput' && !order.isHost) && (
            <div className="">
              <div className="text-xs md:text-sm text-slate-600">
                Alamat Asal : {order.lokasi.alamat_asal !== null ? order.lokasi.alamat_asal : '-'}
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Deskripsi Asal : {order.lokasi.deskripsi_asal}
              </div>
              <div className='mt-3 sm:flex sm:justify-end'>
                <a
                  data-theme="light"
                  onClick={() => {
                    window.open(`https://www.google.com/maps/place/${order.lokasi.lat_asal},${order.lokasi.lng_asal}`);
                  }}
                  href={`https://www.google.com/maps/place/${order.lokasi.lat_asal},${order.lokasi.lng_asal}`}
                  target="_blank"
                  className="btn btn-sm bg-green-100 hover:bg-emerald-200 flex text-xs md:text-sm text-slate-800">
                  Google Maps
                  <MapPinIcon className='w-4 ml-2' />
                </a>
              </div>
            </div>
          )}
          {(type === 'antar' && !order.isHost) && (
            <div className="">
              <div className="text-xs md:text-sm text-slate-600">
                Alamat Tujuan : {order.lokasi.alamat_tujuan !== null ? order.lokasi.alamat_tujuan : '-'}
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Deskripsi Tujuan : {order.lokasi.deskripsi_tujuan}
              </div>
              <div className='mt-3 sm:flex sm:justify-end'>
                <a
                  data-theme="light"
                  onClick={() => {
                    window.open(`https://www.google.com/maps/place/${order.lokasi.lat_asal},${order.lokasi.lng_asal}`);
                  }}
                  href={`https://www.google.com/maps/place/${order.lokasi.lat_asal},${order.lokasi.lng_asal}`}
                  target="_blank"
                  className="btn btn-sm bg-green-100 hover:bg-emerald-200 flex text-xs md:text-sm text-black!important">
                  Google Maps
                  <MapPinIcon className='w-4 ml-2' />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AntarJemputCard;
