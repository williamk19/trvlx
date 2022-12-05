import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React from 'react';

const DataJemput = ({ data, onHandleChange }) => {
  return (
    <div className="grow">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Data Jemput</h2>
        {/* <section>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className='w-full md:w-2/4'>
              <InputLabel forInput="nama_penumpang" value="Nama Penumpang" />
              <TextInput
                type="text"
                name="nama_penumpang"
                value={data.nama_penumpang}
                className="mt-1 block w-full text-black"
                handleChange={onHandleChange}
                required
              />
              <InputError message={''} className="mt-2" />
            </div>
          </div>
        </section> */}
      </div>
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
          <div className="flex self-end">
            <button className="btn btn-error text-slate-100 border-slate-200 hover:border-slate-300 text-slate-600">
              Cancel
            </button>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 border-none text-white ml-3">Save Changes</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DataJemput;