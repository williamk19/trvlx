import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React from 'react';
import BoxMap from '@/Components/MapBox/BoxMap';

const DataJemput = ({ data, onHandleChange, onReset }) => {
  return (
    <div className="grow">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Data Jemput</h2>
        <section>
          <div className="sm:flex gap-4 sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className='w-full md:w-3/4 lg:w-2/4'>
              <InputLabel forInput="lokasi_jemput" value="Lokasi Jemput" className="mb-3" />
              <BoxMap />
            </div>
            <div className='mt-10 w-full md:w-3/4 lg:w-2/4'>
              <div className='w-full'>
                <InputLabel forInput="alamat_jemput" value="Alamat Lengkap Pejemputan" className="mb-3 mt-7 md:mt-0" />
                <TextInput
                  placeholder="Jl. Bratajaya Selatan D90"
                  type="text"
                  name="alamat_jemput"
                  value={data.alamat_jemput}
                  className="mt-1 block w-full text-black"
                  handleChange={onHandleChange}
                  required
                />
                <InputError message={''} className="mt-2" />
              </div>
              <div className='w-full mt-5'>
                <InputLabel className="mb-3" forInput="deskripsi_jemput" value="Deskripsi Pejemputan" />
                <textarea
                  data-theme='light'
                  name="deskripsi_jemput"
                  className="textarea textarea-bordered w-full h-32 resize-none border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                  placeholder="Dekat mini market, belakang pasar,..."></textarea>
                <InputError message={''} className="mt-2" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <button onClick={() => onReset()} className="btn btn-error hover:bg-red-500 text-slate-100 border-slate-200 hover:border-slate-300">
              Cancel
            </button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 border-none text-white ml-3">
              Tambahkan
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DataJemput;