import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthImage from '@/assets/images/image-login.png';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nama_user: '',
    email: '',
    telepon_user: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    if (event.target.name === 'telepon_user') {
      const re = /^[0-9\b]+$/;
      let number = event.target.value.replace(/^0+/, '');
      if (event.target.value === '' || re.test(event.target.value)) {
        setData(event.target.name, number);
      }
    } else if (event.target.type === 'checkbox') {
      setData(event.target.name, event.target.checked);
    } else {
      setData(event.target.name, event.target.value);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('register'), {
      preserveScroll: true,
      replace: true
    });
  };

  return (
    <GuestLayout auth={auth}>
      <Head title="Register" />
      <div className="w-full mt-0 md:mt-14 mb-10 md:mb-0 bg-white shadow-2xl overflow-hidden rounded-xl">
        <main className="w-full shadow-xl">
          <div className=" bg-white relative md:flex rounded-2xl">
            <div className="md:w-2/3">
              <div className="py-2 md:py-8 flex flex-col after:flex-1">
                <div className="w-11/12 md:w-9/12 mx-auto px-3 md:px-4 py-4 md:py-8">
                  <h1 className="text-3xl text-slate-800 font-bold mb-6 text-center md:text-left">Register</h1>
                  <form onSubmit={submit}>
                    <div>
                      <InputLabel forInput="nama_user" value="Nama" />
                      <TextInput
                        type="text"
                        name="nama_user"
                        value={data.nama_user}
                        className="mt-1 block w-full text-black"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                      />
                      <InputError message={errors.nama_user} className="mt-2" />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                      <div className="mt-4 w-full">
                        <InputLabel forInput="email" value="Email" />
                        <TextInput
                          type="email"
                          name="email"
                          value={data.email}
                          className="mt-1 block w-full text-black"
                          autoComplete="email"
                          handleChange={onHandleChange}
                          required
                        />
                        <InputError message={errors.email} className="mt-2" />
                      </div>
                      <div className="mt-4 w-full">
                        <InputLabel forInput="telepon_user" value="Nomor Telepon" />
                        <TextInput
                          telp={`${true}`}
                          type="tel"
                          name="telepon_user"
                          value={data.telepon_user}
                          className="mt-1 block w-full text-black"
                          autoComplete="tel-national"
                          handleChange={onHandleChange}
                          required
                        />
                        <InputError message={errors.telepon_user} className="mt-2" />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                      <div className="mt-4 w-full">
                        <InputLabel forInput="password" value="Password" />
                        <TextInput
                          type="password"
                          name="password"
                          value={data.password}
                          className="mt-1 block w-full text-black"
                          autoComplete="new-password"
                          handleChange={onHandleChange}
                          required
                        />
                        <InputError message={errors.password} className="mt-2" />
                      </div>
                      <div className="mt-4 w-full">
                        <InputLabel forInput="password_confirmation" value="Konfirmasi Password" />
                        <TextInput
                          type="password"
                          name="password_confirmation"
                          value={data.password_confirmation}
                          className="mt-1 block w-full text-black"
                          handleChange={onHandleChange}
                          required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                      <button
                        disabled={processing}
                        className={`btn ${processing && 'loading'} border-none bg-blue-600 hover:bg-blue-700 text-white ml-3 disabled:text-zinc-800`}>
                        Daftar
                      </button>
                    </div>
                  </form>
                  <div className="pt-5 mt-6 border-t border-slate-200">
                    <div className="text-base font-semibold">
                      Telah Memiliki akun?<span> </span>
                      <Link
                        className="font-semibold text-blue-600 hover:text-blue-700"
                        href={route('login')}>
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/3" aria-hidden="true">
              <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
            </div>
          </div>
        </main>
      </div>
    </GuestLayout>
  );
}
