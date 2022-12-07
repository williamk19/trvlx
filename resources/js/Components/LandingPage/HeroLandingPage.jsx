import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

const HeroLandingPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className='hero bg-gradient-to-r from-cyan-500 to-blue-500 pb-8 md:pb-20'>
      <div className="max-w-6xl w-11/12 mt-24 md:mt-30 sm:mt-24 lg:mt-32">
        <div className="hero-content flex-col gap-x-24 p-0 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-shadow-lg text-white">Sewa Mobil Hiace, Elf, Bus, Tour Travel Wisata Jawa Bali
            </h1>
            <p className="py-6 text-sm md:text-lg text-white text-shadow-lg">Dengan Armada Transportasi yang Sehat, Bersih, Harum, pelayanan yang maksimal dan didukung oleh Driver Ramah Profesional serta Customer Service yang fast respon selama 24 jam akan membuat Anda semakin nyaman di perjalanan.</p>
          </div>
          <div className="card border border-cyan-500 overflow-visible flex-shrink-0 w-10/12 md:w-full shadow-2xl bg-base-100 max-w-sm lg:ml-5">
            <div className="card-body p-4 md:p-8">
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
                <ReactDatePicker className='w-full border-gray-300 rounded-lg' selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Jumlah Penumpang</span>
                </label>
                <select defaultValue={'default'} className="select select-bordered w-full">
                  <option value={'default'} disabled>Penumpang</option>
                  <option value={'1'}>1 Penumpang</option>
                  <option value={'2'}>2 Penumpang</option>
                  <option value={'3'}>3 Penumpang</option>
                  <option value={'4'}>4 Penumpang</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-info font-bold">Cari Travel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default HeroLandingPage;