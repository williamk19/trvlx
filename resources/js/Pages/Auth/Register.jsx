import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import PhoneInput from 'react-phone-number-input/input';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nama_user: '',
    email_user: '',
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
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <GuestLayout auth={auth}>
      <Head title="Register" />
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
        <div className="mt-4">
          <InputLabel forInput="email_user" value="Email" />
          <TextInput
            type="email"
            name="email_user"
            value={data.email_user}
            className="mt-1 block w-full text-black"
            autoComplete="username"
            handleChange={onHandleChange}
            required
          />
          <InputError message={errors.email_user} className="mt-2" />
        </div>
        <div className="mt-4">
          <InputLabel forInput="telepon_user" value="Nomor Telepon" />
          <TextInput
            telp={`${true}`}
            type="number"
            name="telepon_user"
            value={data.telepon_user}
            className="mt-1 block w-full text-black"
            autoComplete="username"
            handleChange={onHandleChange}
            required
          />
          <InputError message={errors.telepon_user} className="mt-2" />
        </div>
        <div className="mt-4">
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
        <div className="mt-4">
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
        <div className="flex items-center justify-end mt-4">
          <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
            Sudah Terdaftar?
          </Link>
          <PrimaryButton className="ml-4" processing={processing}>
            Daftar
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
