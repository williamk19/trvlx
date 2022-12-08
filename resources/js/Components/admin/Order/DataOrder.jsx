import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DataOrder = ({ data, onHandleChange, onDateChange, errors }) => {

  return (
    <div className="grow">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Data Diri</h2>
        <section>
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
              <InputError message={errors.message} className="mt-2" />
            </div>
          </div>
        </section>
        <section>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className='w-full md:w-2/4'>
              <InputLabel className='mb-2' forInput="tanggal_pemberangkatan" value="Tanggal Pemberangkatan" />
              <ReactDatePicker
                name="tanggal_pemberangkatan"
                className='w-full text-gray-900 border-gray-300 rounded-lg'
                selected={data.tanggal_pemberangkatan} 
                onChange={(date) => onDateChange(date)} />
              <InputError message={errors.message} className="mt-2" />
            </div>
          </div>
        </section>
        <section>
          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className='w-full md:w-2/4'>
              <InputLabel className='mb-2' forInput="jumlah_seat" value="Jumlah Kursi Dipesan" />
              <select 
                data-theme='light' 
                value={data.jumlah_seat} 
                name='jumlah_seat' 
                className="select select-bordered w-full"
                onChange={onHandleChange}>
                <option value={'default'} disabled>Penumpang</option>
                <option value={1}>1 Penumpang</option>
                <option value={2}>2 Penumpang</option>
                <option value={3}>3 Penumpang</option>
                <option value={4}>4 Penumpang</option>
              </select>
              <InputError message={''} className="mt-2" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataOrder;