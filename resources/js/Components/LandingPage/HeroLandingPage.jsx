import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

const HeroLandingPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="hero min-h-screen max-w-6xl w-11/12 mt-32 sm:mt-24 lg:mt-0">
      <div className="hero-content flex-col gap-x-24 p-0 lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sewa Mobil Hiace, Elf, Bus, Tour Travel Wisata Jawa Bali
          </h1>
          <p className="py-6">Dengan Armada Transportasi yang Sehat, Bersih, Harum, pelayanan yang maksimal dan didukung oleh Driver Ramah Profesional serta Customer Service yang fast respon selama 24 jam akan membuat Anda semakin nyaman di perjalanan.</p>
        </div>
        <div className="card overflow-visible flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Kota Tujuan</span>
              </label>
              <input type="text" placeholder="Anywhere" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tanggal Keberangkatan</span>
              </label>
              <ReactDatePicker className='w-full' selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Jumlah Penumpang</span>
              </label>
              <select defaultValue={'default'} className="select select-bordered w-full max-w-xs">
                <option value={'default'} disabled>Penumpang</option>
                <option value={'1'}>1 Penumpang</option>
                <option value={'2'}>2 Penumpang</option>
                <option value={'3'}>3 Penumpang</option>
                <option value={'4'}>4 Penumpang</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Cari Travel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLandingPage;