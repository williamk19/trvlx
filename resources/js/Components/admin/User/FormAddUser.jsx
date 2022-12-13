import React, { useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import InputError from '../../InputError';
import { Inertia } from '@inertiajs/inertia';

const FormAddUser = ({ itemUser, auth }) => {
  let { url } = usePage();
  let idUrl = +url.split("/")[3];

  const { data, setData, post, processing, errors, reset } = useForm({
    nama_user: itemUser?.nama_user.length > 0 ? itemUser.nama_user : '',
    email: itemUser?.email.length > 0 ? itemUser.email : '',
    telepon_user: itemUser?.telepon_user.length > 0 ? itemUser.telepon_user : '',
    id_kategori: itemUser?.id_kategori ? itemUser.id_kategori : '',
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Inertia.delete(route("user.destroy", itemUser.id));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!itemUser) {
      post(route('user.store'));
    } else {
      Inertia.put(route('user.update', {
        user: itemUser,
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
                <label className="block text-sm font-bold mb-1" htmlFor="nama_user">
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
                <label className="block text-sm font-bold mb-1" htmlFor="email">
                  Email User
                </label>
                <input
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
                <label className="block text-sm font-bold mb-1" htmlFor="telepon_user">
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
              {idUrl !== data.id_kategori ? (
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1" htmlFor="id_kategori">
                    Kategori Pengguna
                  </label>
                  <div>
                    <select
                      name='id_kategori'
                      id="id_kategori"
                      value={data.id_kategori}
                      onChange={(e) => onHandleChange(e)}
                      className="rounded-md form-select">
                      <option value={1}>Super Admin</option>
                      <option value={2}>Admin</option>
                      <option value={3}>Sopir</option>
                      <option value={4}>Pengguna</option>
                    </select>
                  </div>
                  <InputError message={errors.id_kategori} className="mt-2" />
                </div>
              ) : (
                  <div className="flex-1">
                  </div>
              )}
            </div>
            <div className="flex justify-between">
              {itemUser ? (
                <Link onClick={handleDelete} data-theme="light" className="btn btn-error hover:border-slate-300">
                  Hapus User
                </Link>

              ) : (<div></div>)}
              <button type="submit" className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500 hover:bg-slate-200">
                {itemUser ? "Edit" : "Tambahkan"} User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddUser;