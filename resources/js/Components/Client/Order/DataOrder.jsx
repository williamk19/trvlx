import Checkbox from '@/Components/Checkbox';
import SeatSelector from '@/Components/core/SeatSelector';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const DataOrder = ({
  data,
  jadwalData,
  optionJadwal,
  onHandleChange,
  onSelectChange,
  onDateChange,
  errors,
  seatSisa,
  isNameSame
}) => {
  return (
    <div className="grow">
      <div className="p-6 md:py-0 flex md:gap-6 lg:gap-0 flex-col md:flex-row">
        <div className='w-full md:w-2/4'>
          <h2 className="text-2xl text-slate-800 font-bold mb-5">Data Diri</h2>
          <section>
            <label className="flex items-center">
              <Checkbox name="same-name" value={isNameSame} handleChange={onHandleChange} />
              <span className="ml-2 text-sm md:text-base font-bold text-gray-700">Nama penumpang sama dengan akun</span>
            </label>
            <div className="sm:flex w-full lg:w-10/12 sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className='w-full'>
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
            </div>
            <div className="sm:flex w-full lg:w-10/12 sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className='w-full'>
                <InputLabel className='mb-2' forInput="tanggal_pemberangkatan" value="Tanggal Pemberangkatan" />
                <ReactDatePicker
                  disabledKeyboardNavigation
                  onFocus={e => e.target.blur()}
                  name="tanggal_pemberangkatan"
                  className='w-full text-gray-900 border-gray-300 rounded-lg'
                  selected={data.tanggal_pemberangkatan}
                  minDate={new Date()}
                  onChange={(date) => onDateChange(date)} />
                <InputError message={errors.tanggal_pemberangkatan} className="mt-2" />
              </div>
            </div>
          </section>
          <section>
            <div className="sm:flex w-full lg:w-10/12 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 mb-0 md:mb-8">
              <div className='w-full'>
                <InputLabel className='mb-2' forInput="layanan" value="Jadwal Travel Kota" />
                <Select
                  className='text-gray-700 text-base font-semibold disabled:text-gray-900'
                  onChange={onSelectChange}
                  name='jadwal'
                  value={
                    optionJadwal[
                      optionJadwal.findIndex((e) => (e.options.some((c) => c.value === data.jadwal)))
                    ].options[
                    optionJadwal[
                      optionJadwal.findIndex((e) => (e.options.some((c) => c.value === data.jadwal)))
                    ].options.findIndex((e) => e.value === data.jadwal)
                    ]
                  }
                  options={optionJadwal} />
                <InputError message={errors.layanan} className="mt-2" />
              </div>
            </div>
          </section>
        </div>
        <div className='w-full md:w-2/4'>
          {seatSisa >= 0 && (
            <div className='text-black text-md font-semibold mt-4'>
              <h1>{`Jumlah Kursi Tersisa : ${seatSisa}`}</h1>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DataOrder;
