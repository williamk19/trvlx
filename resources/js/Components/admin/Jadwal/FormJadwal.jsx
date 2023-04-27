import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/inertia-react';
import TimePicker from 'rc-time-picker';
import Select from 'react-select';
import 'rc-time-picker/assets/index.css';
import { useEffect, useState } from 'react';
import moment from 'moment';

const FormJadwal = ({
  itemJadwal,
  listSopir,
  listKendaraan,
  listLayanan
}) => {
  const { data, setData, post, processing, errors, reset, put } = useForm({
    id_layanan: itemJadwal?.id_layanan
      ? itemJadwal.id_layanan
      : listLayanan[0]?.value,
    id_sopir: itemJadwal?.id_sopir
      ? itemJadwal.id_sopir
      : listSopir[0]?.value,
    id_kendaraan: itemJadwal?.id_kendaraan
      ? itemJadwal.id_kendaraan
      : listKendaraan[0]?.value,
    status: itemJadwal?.status ? itemJadwal.status : 'active',
    waktu: itemJadwal?.waktu ? itemJadwal.waktu : '',
  });

  const [timeJadwal, setTimeJadwal] = useState(
    itemJadwal?.waktu
      ? moment(itemJadwal.waktu, 'HHmm')
      : moment('0000', 'HHmm')
  );

  useEffect(() => {
    setData('waktu', timeJadwal.format('HH:mm'));
  }, [timeJadwal]);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const onSelectChange = (selected) => {
    setData(selected.name, selected.value);
  };

  const onTimeChange = (timeChange) => {
    setTimeJadwal(timeChange);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!itemJadwal) {
      post(route('jadwal.store'));
    } else {
      put(route('jadwal.update', {
        jadwal: itemJadwal,
        ...data
      }));
    }
  };

  const optionStatus = [
    { value: 'active', label: 'Active', name: 'status' },
    { value: 'disabled', label: 'Disabled', name: 'status' },
  ];

  return (
    <div data-theme="light" className='rounded-lg p-8 shadow-lg lg:w-8/12'>
      <div>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 mb-1">
                <label className="block text-base font-bold mb-3" htmlFor="id_layanan">
                  Layanan Kota Travel
                </label>
                <Select
                  defaultValue={listLayanan[listLayanan.findIndex((i) => +i.value === +data.id_layanan)]}
                  onChange={onSelectChange}
                  name='id_layanan'
                  options={listLayanan} />
                <InputError message={errors.id_layanan} className="mt-2" />
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 mb-1">
                <label className="block text-base font-bold mb-3" htmlFor="id_kendaraan">
                  Kendaraan yang digunakan
                </label>
                <Select
                  defaultValue={listKendaraan[listKendaraan.findIndex((i) => +i.value === +data.id_kendaraan)]}
                  onChange={onSelectChange}
                  name='id_kendaraan'
                  options={listKendaraan} />
                <InputError message={errors.id_sopir} className="mt-2" />
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-base font-bold mb-3" htmlFor="id_sopir">
                  Sopir Travel
                </label>
                <Select
                  defaultValue={listSopir[listSopir.findIndex((i) => +i.value === +data.id_sopir)]}
                  onChange={onSelectChange}
                  name='id_sopir'
                  options={listSopir} />
                <InputError message={errors.id_sopir} className="mt-2" />
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 mb-4">
                <label className="block text-base font-bold mb-3" htmlFor="waktu">
                  Waktu Travel
                </label>
                <TimePicker
                  onChange={onTimeChange}
                  name='waktu'
                  defaultValue={timeJadwal}
                  minuteStep={5}
                  inputClassName='text-black'
                  popupClassName='text-black text-lg!important font-semibold'
                  className='text-black text-lg!important font-medium'
                  showSecond={false} />
                <InputError message={errors.waktu} className="mt-2" />
              </div>
              <div className="flex-initial w-1/5">
                <label className="block text-sm font-bold mb-3" htmlFor="status">
                  Status Layanan
                </label>
                <Select
                  defaultValue={optionStatus[0]}
                  onChange={onSelectChange}
                  name='status'
                  options={optionStatus} />
                <InputError message={errors.status} className="mt-2" />
              </div>
            </div>
            <div className="flex justify-between">
              {itemJadwal ? (
                <button onClick={(e) => handleDelete(e)} data-theme="light" className="btn btn-error hover:border-slate-300 hidden">
                  Hapus Jadwal
                </button>
              ) : (<div></div>)}
              <button
                type="submit"
                disabled={processing}
                className={`btn ${processing && 'loading'} bg-indigo-500 border-slate-200 hover:border-slate-300 text-white hover:bg-indigo-600 disabled:text-black`}>
                {itemJadwal ? "Edit" : "Tambahkan"} Jadwal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormJadwal;
