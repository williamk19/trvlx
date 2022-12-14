import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('password.update'));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form className='w-full md:w-10/12 lg:w-6/12 rounded-lg shadow-2xl bg-white p-8' onSubmit={submit}>
        <div>
          <InputLabel forInput="email" value="Email" />

          <TextInput
            disabled={true}
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full text-gray-800"
            autoComplete="username"
            handleChange={onHandleChange}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel forInput="password" value="Password" />

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full text-gray-800"
            autoComplete="new-password"
            isFocused={true}
            handleChange={onHandleChange}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel forInput="password_confirmation" value="Confirm Password" />

          <TextInput
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full text-gray-800"
            autoComplete="new-password"
            handleChange={onHandleChange}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" processing={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
