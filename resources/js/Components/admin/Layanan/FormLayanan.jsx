import { useForm } from '@inertiajs/inertia-react';
import InputError from '../../InputError';
import { Inertia } from '@inertiajs/inertia';
import CurrencyFormat from 'react-currency-format';

const FormLayanan = ({ itemLayanan, itemSopir, itemKendaraan, listSopir, listKendaraan }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    kota_asal: itemLayanan?.kota_asal.length > 0 ? itemLayanan.kota_asal : '',
    kota_tujuan: itemLayanan?.kota_tujuan.length > 0 ? itemLayanan.kota_tujuan : '',
    biaya_jasa: itemLayanan?.biaya_jasa > 0 ? itemLayanan.biaya_jasa : 0,
    sopir: itemSopir?.id ? itemSopir.id : 0,
    kendaraan: itemKendaraan?.id ? itemKendaraan.id : 0,
    status: itemLayanan?.status.length > 0 ? itemLayanan.status : 'active'
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Inertia.delete(route("layanan.destroy", itemLayanan.id_layanan));
  }

  const submit = (e) => {
    e.preventDefault();
    if (!itemLayanan) {
      post(route('layanan.store'));
    } else {
      Inertia.put(route('layanan.update', {
        layanan: itemLayanan,
        ...data
      }));
    }
  };

  return (
    <div data-theme="light" className='rounded-lg p-8 shadow-lg lg:w-8/12'>
      <div>
        <form onSubmit={submit}>
          <div className="space-y-4">
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="kota_asal">
                  Kota Asal Travel
                </label>
                <input
                  id="kota_asal"
                  className="form-input rounded-md w-full"
                  type="text"
                  value={data.kota_asal}
                  name='kota_asal'
                  onChange={(e) => onHandleChange(e)}
                  placeholder='Malang, Surabaya, ...' />
                <InputError message={errors.kota_asal} className="mt-2" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="kota_tujuan">
                  Kota Tujuan Travel
                </label>
                <input
                  id="kota_tujuan"
                  className="form-input rounded-md w-full"
                  type="text"
                  value={data.kota_tujuan}
                  name='kota_tujuan'
                  onChange={(e) => onHandleChange(e)}
                  placeholder='Jakarta, Madura, ...' />
                <InputError message={errors.kota_tujuan} className="mt-2" />
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="sopir">
                  Sopir Travel
                </label>
                <select
                  data-theme='light'
                  value={data.sopir}
                  name='sopir'
                  className="select select-bordered border-slate-500 w-full"
                  onChange={(e) => onHandleChange(e)}>
                  <option value={'default'} className='text-black' disabled>Nama Sopir</option>
                  {listSopir.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
                <InputError message={errors.sopir} className="mt-2" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="kendaraan">
                  Kendaraan Travel
                </label>
                <select
                  data-theme='light'
                  value={data.kendaraan}
                  name='kendaraan'
                  className="select select-bordered border-slate-500 w-full"
                  onChange={(e) => onHandleChange(e)}>
                  <option value={'default'} className='text-black' disabled>Nama Kendaraan</option>
                  {listKendaraan.map((k) => (
                    <option key={k.id} value={k.id}>{k.title}</option>
                  ))}
                </select>
                <InputError message={errors.kendaraan} className="mt-2" />
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="biaya_jasa">
                  Biaya Jasa Layanan
                </label>
                <CurrencyFormat
                  thousandSeparator={true} 
                  prefix={'Rp. '}
                  id="biaya_jasa"
                  className="form-input rounded-md w-full"
                  type="text"
                  value={data.biaya_jasa}
                  name='biaya_jasa'
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setData("biaya_jasa", +value);
                  }}
                  placeholder='Rp. 250,000' />
                <InputError message={errors.biaya_jasa} className="mt-2" />
              </div>
              <div className="flex-initial">
                <label className="block text-sm font-bold mb-1" htmlFor="status">
                  Status Layanan
                </label>
                <select
                  data-theme='light'
                  value={data.status}
                  name='status'
                  className="select select-bordered border-slate-500 w-full"
                  onChange={(e) => onHandleChange(e)}>
                  <option value={'default'} className='text-black' disabled>Status</option>
                    <option value={'active'}>{'Active'}</option>
                    <option value={'disabled'}>{'Disabled'}</option>
                </select>
                <InputError message={errors.kendaraan} className="mt-2" />
              </div>
            </div>
            <div className="flex justify-between">
              {itemLayanan ? (
                <button onClick={(e) => handleDelete(e)} data-theme="light" className="btn btn-error hover:border-slate-300">
                  Hapus Layanan
                </button>
              ) : (<div></div>)}
              <button type="submit" className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500 hover:bg-slate-200">
                {itemLayanan ? "Edit" : "Tambahkan"} Layanan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLayanan;