import React, { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthImage from '@/assets/images/image-login.png';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import Banner from '@/Components/core/Banner';

export default function Login({ auth, status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: '',
  });
  const [bannerOpen, setBannerOpen] = useState(false);

  // const [timeoutLogin, setTimeoutLogin] = useState(0);
  // const [timeLeft, { start, pause, resume }] = useCountDown(0, 1000);
  // useEffect(() => {
  //   if (typeof errors?.seconds == 'number') {
  //     setTimeoutLogin(errors?.secods);
  //   }
  // }, [errors]);
  // useEffect(() => {
  //   if (timeoutLogin > 0) {
  //     start(timeoutLogin * 1000);
  //   }
  // }, [timeoutLogin]);
  // useEffect(() => {
  //   console.log(timeLeft);
  //   if (timeLeft > 0) {
  //     errors.email = `Terlalu banyak login. Coba login kembali dalam ${timeLeft / 1000} detik.`;
  //   } else if (timeLeft === 0) {
  //     errors.email = ``;
  //   }
  // }, [timeLeft]);

  useEffect(() => {
    if (status) 
      setBannerOpen(true);

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
      {status && 
        <Banner className="w-full mb-10" type="success" open={bannerOpen} setOpen={setBannerOpen}>
          {status}
        </Banner>}
      <div className="w-full -mt-10 md:mt-0 lg:mt-0 2xl:-mt-5 bg-white shadow-2xl overflow-hidden rounded-xl">
        <main className="w-full shadow-xl">
          <div className=" bg-white relative md:flex">
            <div className="md:w-1/2">
              <div className="py-4 flex flex-col after:flex-1">
                <div className="w-10/12 md:w-9/12 mx-auto px-0 md:px-4 md:py-8">
                  <h1 className="text-center md:text-left text-3xl text-slate-800 font-bold mb-6">Login</h1>
                  <form onSubmit={submit}>
                    <div className="space-y-4">
                      <div>
                        <InputLabel forInput="email" value="Email" />
                        <TextInput
                          id="email"
                          type="email"
                          name="email"
                          value={data.email}
                          className="block w-full text-gray-700"
                          autoComplete="email"
                          isFocused={true}
                          handleChange={onHandleChange}
                        />
                        <InputError message={errors.email} className="mt-2" />
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
                          href="/forgot-password">
                          Forgot Password?
                        </Link>
                      </div>
                      <button
                        type='submit'
                        disabled={processing}
                        className={`btn ${processing && 'loading'} border-none bg-blue-600 hover:bg-blue-700 text-white ml-3 disabled:text-black`}>
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