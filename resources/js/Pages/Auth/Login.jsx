import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthImage from '@/assets/images/image-login.png';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ auth, status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email_user: '',
    password: '',
    remember: '',
  });

  useEffect(() => {
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
      <div className="w-full mt-6 bg-white shadow-2xl overflow-hidden rounded-xl">
        <main className="w-full shadow-xl">
          <div className=" bg-white relative md:flex">
            <div className="md:w-1/2">
              <div className="py-8 flex flex-col after:flex-1">
                <div className="flex-1">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                  </div>
                </div>
                <div className="w-9/12 mx-auto px-4 py-8">
                  <h1 className="text-3xl text-slate-800 font-bold mb-6">Login</h1>
                  <form onSubmit={submit}>
                    <div className="space-y-4">
                      <div>
                        <InputLabel forInput="email_user" value="Email" />
                        <TextInput
                          id="email_user"
                          type="email"
                          name="email_user"
                          value={data.email_user}
                          className="block w-full text-gray-700"
                          autoComplete="email"
                          isFocused={true}
                          handleChange={onHandleChange}
                        />
                        <InputError message={errors.email_user} className="mt-2" />
                      </div>
                      <div className="mt-4">
                        <InputLabel forInput="password" value="Password" />
                        <TextInput
                          id="password"
                          type="password"
                          name="password"
                          value={data.password}
                          className="block w-full text-black"
                          autoComplete="current-password"
                          handleChange={onHandleChange}
                        />
                        <InputError message={errors.password} className="mt-2" />
                      </div>
                    </div>
                    <div className="block mt-4">
                      <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                      </label>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="mr-1">
                        <Link
                          className="text-sm text-gray-700 underline hover:no-underline"
                          href="/reset-password">
                          Forgot Password?
                        </Link>
                      </div>
                      <button
                        type='submit'
                        disabled={processing}
                        className="btn border-none bg-blue-600 hover:bg-blue-700 text-white ml-3">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className="pt-5 mt-6 border-t border-slate-200">
                    <div className="text-base font-semibold">
                      Belum Memiliki akun?<span> </span>
                      <Link
                        className="font-semibold text-blue-600 hover:text-blue-700"
                        href={route('register')}>
                        Daftar Akun
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
              <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
            </div>

          </div>
        </main>
      </div>

    </GuestLayout>
  );
}