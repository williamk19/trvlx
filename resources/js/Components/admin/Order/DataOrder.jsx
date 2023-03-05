import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React, { useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import id from 'date-fns/locale/id';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import _ from 'lodash';
import SeatSelector from '@/Components/core/SeatSelector';
import { useRef } from 'react';

const DataOrder = ({
  data,
  edit,
  idPembayaran,
  jadwalData,
  seatTerpesan,
  setData,
  optionJadwal,
  onHandleChange,
  onDateChange,
  onSelectChange,
  errors,
  seatSisa,
  seatDipilih,
  setSeatDipilih,
  seatTotal
}) => {
  registerLocale('id', id);
  const rows = useRef([]);
  const [rowsState, setRowsState] = useState([]);
  const count = useRef(0);

  useEffect(() => {
    setData('jumlah_seat', seatDipilih.length);
  }, [data.seatSelected]);

  useEffect(() => {
    setData('seatSelected', seatDipilih);
  }, [seatDipilih]);

  useEffect(() => {
    if (edit && seatTerpesan.length > 0) {
      const arrOfSeatTerpesan = seatTerpesan.map((e) => ({ seatNumber: e.seat_number }));
      setSeatDipilih(arrOfSeatTerpesan);
    }
  }, [seatTerpesan]);

  useEffect(() => {
    rows.current = [];
    for (let index = 1; index <= seatTotal; index++) {
      if (index === 1) {
        rows.current.push([{ id: index, number: index }]);
        count.current = count.current + 1;
      } else {
        if (rows.current[count.current] === undefined) {
          rows.current.push([{ id: index, number: index }]);
        } else {
          if (rows.current[count.current].length >= 3) {
            rows.current.push([{ id: index, number: index }]);
            count.current = count.current + 1;
          } else {
            rows.current[count.current].push({ id: index, number: index });
          }
        }
      }
    }
    setRowsState(rows.current);
    count.current = 0;
  }, [seatTotal]);

  return (
    <div className="grow">
      <div className="p-6 md:py-0 flex md:gap-6 lg:gap-0 flex-col md:flex-row">
        <div className='w-full md:w-2/4'>
          <h2 className="text-2xl text-slate-800 font-bold mb-5">Data Diri</h2>
          <section>
            <div className="sm:flex w-full lg:w-10/12 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className='w-full'>
                <InputLabel forInput="nama_penumpang" value="Nama Penumpang / Pemesan" />
                <TextInput
                  type="text"
                  placeholder=''
                  name="nama_penumpang"
                  value={data.nama_penumpang}
                  className="mt-1 block w-full text-black"
                  handleChange={onHandleChange}
                  required
                />
                <InputError message={errors.nama_penumpang} className="mt-2" />
              </div>
            </div>
            <div className="sm:flex w-full lg:w-10/12 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
              <div className='w-full'>
                <InputLabel className='mb-2' forInput="tanggal_pemberangkatan" value="Tanggal Pemberangkatan" />
                <ReactDatePicker
                  locale="id"
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
            <div className="sm:flex w-full lg:w-10/12 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 mb-0">
              <div className='w-full'>
                <InputLabel className='mb-2' forInput="layanan" value="Jadwal Travel Kota" />
                <Select
                  className='text-gray-700 text-base font-semibold disabled:text-gray-900'
                  onChange={onSelectChange}
                  name='jadwal'
                  value={
                    optionJadwal[
                      optionJadwal.findIndex((e) => (e.options.some((c) => +c.value === +data.jadwal)))
                    ].options[
                    optionJadwal[
                      optionJadwal.findIndex((e) => (e.options.some((c) => +c.value === +data.jadwal)))
                    ].options.findIndex((e) => e.value === data.jadwal)
                    ]
                  }
                  options={optionJadwal} />
                <InputError message={errors.layanan} className="mt-2" />
              </div>
            </div>
            <div className="sm:flex w-full lg:w-11/12 sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 mb-0 md:mb-8 justify-between">
              <div className='w-full md:w-2/5'>
                <InputLabel className='mb-2' forInput="status" value="Status Pembayaran" />
                <select
                  data-theme='light'
                  value={data.status}
                  name='status'
                  className="select select-bordered w-full"
                  onChange={onHandleChange}>
                  <option value={''} disabled>Status Pembayaran</option>
                  <option value={'init'}>Init</option>
                  <option value={'pending'}>Pending</option>
                  <option value={'done'}>Done</option>
                  <option value={'confirmed'}>Confirmed</option>
                  <option value={'failed'}>Failed</option>
                </select>
                <InputError message={errors.status} className="mt-2" />
              </div>
              {idPembayaran && (
                <div className='text-base font-bold text-gray-800'>
                  <h1 className='md:text-right text-base mb-1 font-medium'>Id Travel Order</h1>
                  <h1>{idPembayaran}</h1>
                </div>
              )}
            </div>
          </section>
        </div>
        <div className='w-full md:w-2/4'>
          {seatSisa >= 0 && (
            <div className='text-black text-md font-semibold mt-4'>
              <h1>{`Jumlah Kursi Tersisa : ${seatSisa}`}</h1>
            </div>
          )}
          <SeatSelector
            seatTerpesan={seatTerpesan}
            edit={edit}
            seatDipilih={seatDipilih}
            setSeatDipilih={setSeatDipilih}
            data={data}
            setData={setData}
            rows={rowsState}
            seatSisa={seatSisa} />
          <InputError message={errors.seatSelected} className="mt-2" />
        </div>
      </div>
    </div>
  );
};

export default DataOrder;
