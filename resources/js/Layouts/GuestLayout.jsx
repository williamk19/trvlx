import React from "react";
import NavbarLandingPage from '@/Components/LandingPage/NavbarLandingPage';

export default function Guest({auth, children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-start items-center bg-gray-100">
      <NavbarLandingPage auth={auth} />
      <div className="w-6/12 flex-1 flex flex-col justify-center items-center">
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
