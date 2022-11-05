import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ auth, status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email_user: '',
    password: '',
    remember: '',
  });

  useEffect(() => {
    console.log(errors);
    return () => {
      reset('password');
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout auth={auth}>
      <Head title="Log in" />
      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

      <form onSubmit={submit}>
        <div>
          <InputLabel forInput="email_user" value="Email" />

          <TextInput
            type="email"
            name="email_user"
            value={data.email_user}
            className="mt-1 block w-full text-black"
            autoComplete="email"
            isFocused={true}
            handleChange={onHandleChange}
          />
          <InputError message={errors.email_user} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel forInput="password" value="Password" />

          <TextInput
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full text-black"
            autoComplete="current-password"
            handleChange={onHandleChange}
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </Link>
          )}

          <PrimaryButton className="ml-4" processing={processing}>
            Log in
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
