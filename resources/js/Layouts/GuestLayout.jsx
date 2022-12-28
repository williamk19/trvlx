import React from "react";
import NavbarLandingPage from '@/Components/LandingPage/NavbarLandingPage';

export default function Guest({ auth, children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-start items-center bg-gray-100">
      <NavbarLandingPage auth={auth} />
      <div className="w-11/12 max-w-6xl flex-1 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
}
