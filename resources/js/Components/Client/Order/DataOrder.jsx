import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DataOrder = ({ data, layananData, onHandleChange, onDateChange, errors }) => {
  return (
    <div className="grow">
      <div className="p-6 md:py-0 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">Data Diri</h2>
        <section>
          <div className="sm:flex w-full lg:w-10/12 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
            <div className='w-full md:w-2/4'>
              <InputLabel forInput="nama_penumpang" value="Nama Penumpang / Pemesan" />
                <TextInput
                  type="text"
                  name="nama_penumpang"
                  value={data.nama_penumpang}
                  className="mt-1 block w-full text-black"
                  handleChange={onHandleChange}
                  required
                />
              <InputError message={errors.nama_penumpang} className="mt-2" />
            </div>
            <div className='w-full md:w-2/4'>
              <InputLabel className='mb-2' forInput="tanggal_pemberangkatan" value="Tanggal Pemberangkatan" />
              <ReactDatePicker
                name="tanggal_pemberangkatan"
                className='w-full text-gray-900 border-gray-300 rounded-lg'
                selected={data.tanggal_pemberangkatan}
                onChange={(date) => onDateChange(date)} />
              <InputError message={errors.tanggal_pemberangkatan} className="mt-2" />
            </div>
          </div>
        </section>
        <section>
          <div className="sm:flex w-full lg:w-10/12 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 mb-0 md:mb-8">
            <div className='w-full md:w-2/4'>
              <InputLabel className='mb-2' forInput="jumlah_seat" value="Jumlah Kursi Dipesan" />
              <select
                data-theme='light'
                value={data.jumlah_seat}
                name='jumlah_seat'
                className="select select-bordered w-full"
                onChange={onHandleChange}>
                <option value={''} disabled>Travel</option>
                <option value={1}>1 Penumpang</option>
                <option value={2}>2 Penumpang</option>
                <option value={3}>3 Penumpang</option>
                <option value={4}>4 Penumpang</option>
              </select>
              <InputError message={errors.jumlah_seat} className="mt-2" />
            </div>
            <div className='w-full md:w-2/4'>
              <InputLabel className='mb-2' forInput="layanan" value="Layanan Travel Kota" />
              <select
                data-theme='light'
                value={data.layanan}
                name='layanan'
                className="select select-bordered w-full"
                onChange={onHandleChange}>
                <option value={''} disabled>Kota - Tujuan</option>
                {layananData.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.kota_asal} - {l.kota_tujuan} (Rp.{l.biaya_jasa})
                  </option>
                ))}
              </select>
              <InputError message={errors.layanan} className="mt-2" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataOrder;