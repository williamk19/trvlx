import { useForm } from '@inertiajs/react';
import InputError from '../../InputError';
import { router } from '@inertiajs/react';
import CurrencyFormat from 'react-currency-format';

const FormLayanan = ({ itemLayanan, itemSopir, itemKendaraan, listSopir, listKendaraan }) => {
  const { data, setData, post, processing, errors, reset, put } = useForm({
    kota_asal: itemLayanan?.kota_asal.length > 0 ? itemLayanan.kota_asal : '',
    kota_tujuan: itemLayanan?.kota_tujuan.length > 0 ? itemLayanan.kota_tujuan : '',
    biaya_jasa: itemLayanan?.biaya_jasa > 0 ? itemLayanan.biaya_jasa : 0,
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Inertia.delete(route("layanan.destroy", itemLayanan.id_layanan));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!itemLayanan) {
      post(route('layanan.store'));
    } else {
      put(route('layanan.update', {
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
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
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
            </div>
            <div className="flex justify-between">
              {itemLayanan ? (
                <button onClick={(e) => handleDelete(e)} data-theme="light" className="btn btn-error hover:border-slate-300 hidden">
                  Hapus Layanan
                </button>
              ) : (<div></div>)}
              <button
                type="submit"
                disabled={processing}
                className={`btn ${processing && 'loading'} bg-indigo-500 border-slate-200 hover:border-slate-300 text-white hover:bg-indigo-600 disabled:text-black`}>
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
