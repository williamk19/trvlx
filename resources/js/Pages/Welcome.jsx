import React from "react";
import { Head } from "@inertiajs/inertia-react";
import NavbarLandingPage from '@/Components/NavbarLandingPage';

export default function Welcome(props) {
  return (
    <div data-theme='light' className='min-h-screen flex flex-col justify-top items-center p-3'>
      <Head title="Travel Booking System" />
      <NavbarLandingPage />
      {/* <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://placeimg.com/1000/800/arch")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat
              fugiat ut assumenda excepturi exercitationem quasi.
              In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
