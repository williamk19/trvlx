import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React from 'react';
import BoxMap from '@/Components/MapBox/BoxMap';

const DataJemput = ({ data, onHandleChange, errors, onLocationChange }) => {

  return (
    <div className="grow">
      <div className="p-6 md:py-0 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Data Jemput</h2>
        <section>
          <div className="sm:flex gap-4 sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className='w-full md:w-3/4 lg:w-2/4'>
              <InputLabel forInput="latlng_asal" value="Titik Jemput Pengguna" className="mb-3" />
              <form className="w-full h-52 md:h-72 rounded-2xl" >
                <BoxMap
                  name="latlng_asal"
                  latlng={data.latlng_asal}
                  onLocationChange={onLocationChange}
                />
              </form>
              <p className='text-gray-600 font-semibold mt-5 mb-5'>
                * Arahkan tanda biru untuk memilih lokasi yang diinginkan
              </p>
            </div>
            <div className='mt-10 w-full md:w-3/4 lg:w-2/4'>
              <div className='w-full'>
                <InputLabel forInput="alamat_asal" value="Alamat Lengkap Pejemputan"
                  className="mb-3 mt-7 md:mt-0" />
                <TextInput
                  placeholder="Jl. Bratajaya Selatan D90"
                  type="text"
                  name="alamat_asal"
                  value={data.alamat_asal}
                  className="mt-1 block w-full text-black"
                  handleChange={onHandleChange}
                  required
                />
                <InputError message={errors.alamat_asal} className="mt-2" />
              </div>
              <div className='w-full mt-5'>
                <InputLabel className="mb-3" forInput="deskripsi_asal" value="Deskripsi Pejemputan" />
                <textarea
                  data-theme='light'
                  name="deskripsi_asal"
                  value={data.deskripsi_asal}
                  onChange={onHandleChange}
                  className="textarea textarea-bordered w-full h-32 resize-none border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                  placeholder="Dekat mini market, belakang pasar,..."></textarea>
                <InputError message={errors.deskripsi_asal} className="mt-2" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataJemput;
