import InputError from '@/Components/InputError';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function Settings({ itemUser, ...props }) {
  const { data, setData, post, processing, errors, reset, put } = useForm({
    nama_user: itemUser?.nama_user.length > 0 ? itemUser.nama_user : '',
    email: itemUser?.email.length > 0 ? itemUser.email : '',
    telepon_user: itemUser?.telepon_user.length > 0 ? itemUser.telepon_user : '',
    id_kategori: itemUser?.id_kategori ? itemUser.id_kategori : '',
    password: '',
    confirm: ''
  });

  useEffect(() => {
    if (!_.isEmpty(props.flash.message)) {
      toast.info(`Data Berhasil Diubah`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [props.flash]);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    put(route('account.update', {
      user: itemUser,
      type: 'setting',
      ...data
    }));
  };

  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Settings</h2>}
    >
      <Head title="Settings" />
      <ToastContainer />
      <div data-theme="light" className="py-10 max-w-4xl rounded-xl shadow-xl">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className='px-6 mb-2 md:mb-8'>
            <h1 className='text-xl md:text-3xl font-bold text-slate-800'>
              Account Settings ⚙️
            </h1>
          </div>
          <div className="bg-white overflow-hidden sm:rounded-lg">
            <div className="p-6">
              <form autoComplete="off" onSubmit={submit}>
                <div className="space-y-4">
                  <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                      <label className="block text-md font-bold mb-2" htmlFor="nama_user">
                        Nama User
                      </label>
                      <input
                        id="nama_user"
                        className="form-input rounded-md w-full"
                        type="text"
                        value={data.nama_user}
                        name='nama_user'
                        onChange={(e) => onHandleChange(e)}
                        placeholder='Budi Tono' />
                      <InputError message={errors.nama_user} className="mt-2" />
                    </div>
                  </div>
                  <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                      <label className="block text-md font-bold mb-2" htmlFor="email">
                        Email User
                      </label>
                      <input
                        autoComplete="off"
                        id="email"
                        className="form-input rounded-md w-full"
                        type="text"
                        value={data.email}
                        name='email'
                        onChange={(e) => onHandleChange(e)}
                        placeholder='admin@gmail.com' />
                      <InputError message={errors.email} className="mt-2" />
                    </div>
                  </div>
                  <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                      <label className="block text-md font-bold mb-2" htmlFor="telepon_user">
                        Telepon User
                      </label>
                      <input
                        id="telepon_user"
                        className="form-input rounded-md w-full"
                        type="text"
                        value={data.telepon_user}
                        name='telepon_user'
                        onChange={(e) => onHandleChange(e)}
                        placeholder='M129DC' />
                      <InputError message={errors.telepon_user} className="mt-2" />
                    </div>
                  </div>
                  <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-1">
                      <label className="block text-md font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        autoComplete="off"
                        id="password"
                        className="form-input rounded-md w-full"
                        type="password"
                        value={data.password}
                        name='password'
                        onChange={(e) => onHandleChange(e)}
                        placeholder='' />
                      <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-md font-bold mb-2" htmlFor="confirm">
                        Konfirmasi Password
                      </label>
                      <input
                        autoComplete='off'
                        id="confirm"
                        className="form-input rounded-md w-full"
                        type="password"
                        value={data.confirm}
                        name='confirm'
                        onChange={(e) => onHandleChange(e)}
                        placeholder='' />
                      <InputError message={errors.confirm} className="mt-2" />
                    </div>
                  </div>
                  <p>* Kosongi password apabila password tidak berganti</p>
                  <div className="flex justify-between">
                    <div></div>
                    <button type="submit" className="btn bg-indigo-400 border-slate-200 hover:border-slate-300 text-white hover:bg-indigo-600">
                      Ubah
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
