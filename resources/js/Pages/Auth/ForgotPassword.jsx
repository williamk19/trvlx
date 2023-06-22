import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />
      <div className='bg-white p-4 rounded-md max-w-xl shadow-2xl'>
        <div className="mb-4 text-md text-gray-700 font-medium">
          Silahkan ketik alamat email anda untuk menerima email yang dapat anda gunakan untuk melakukan reset password.
        </div>

        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

        <form onSubmit={submit}>
          <TextInput
            type="text"
            name="email"
            value={data.email}
            className="mt-1 block w-full text-black"
            isFocused={true}
            handleChange={onHandleChange}
          />

          <InputError message={errors.email} className="mt-2" />

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton className="ml-4" processing={processing}>
              Email Tautan Reset Password
            </PrimaryButton>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
