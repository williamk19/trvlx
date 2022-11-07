import React, { useEffect } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import InputError from '../InputError';

const FormAddKendaraan = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    merk_mobil: '',
    nama_mobil: '',
    plat_nomor: '',
    jumlah_seat: 0,
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('kendaraan.store'));
  };

  return (
    <div data-theme="light" className='rounded-lg p-8 shadow-lg lg:w-8/12'>
      <div>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="card-name">
                  Nama Kendaraan
                </label>
                <input 
                  id="card-name" 
                  className="form-input rounded-md w-full" 
                  type="text"
                  value={data.nama_mobil}
                  name='nama_mobil'
                  onChange={(e) => onHandleChange(e)}
                  placeholder='Innova, Hiace, Terios'/>
                <InputError message={errors.nama_mobil} className="mt-2" />
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="card-surname">
                  Merk Kendaraan
                </label>
                <input 
                  id="card-surname" 
                  className="form-input rounded-md w-full" 
                  type="text"
                  value={data.merk_mobil}
                  name='merk_mobil'
                  onChange={(e) => onHandleChange(e)} 
                  placeholder='Toyota, Daihatsu' />
                <InputError message={errors.nama_mobil} className="mt-2" />
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="card-address">
                  Plat Nomor Kendaraan
                </label>
                <input 
                  id="card-address" 
                  className="form-input rounded-md w-full" 
                  type="text" 
                  value={data.plat_nomor}
                  name='plat_nomor'
                  onChange={(e) => onHandleChange(e)}
                  placeholder='M129DC'/>
                <InputError message={errors.plat_nomor} className="mt-2" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="card-city">
                  Jumlah Seat Kendaraan
                </label>
                <input 
                  id="card-city" 
                  className="form-input rounded-md w-full"
                  value={data.jumlah_seat}
                  name='jumlah_seat'
                  onChange={(e) => onHandleChange(e)}
                  placeholder='5, 7, 13, ...' 
                  type="number" />
                <InputError message={errors.jumlah_seat} className="mt-2" />
              </div>
            </div>
            <div className="text-right">
              <button type="submit" className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500">
                Tambahkan Mobil
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormAddKendaraan;