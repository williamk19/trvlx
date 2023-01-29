import React, { useState } from 'react';
import Sidebar from '@/Components/core/Sidebar';
import Header from '@/Components/core/Header';
import Banner from '@/Components/core/Banner';

const AuthenticatedLayout = ({ auth, header, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={auth.user.id_kategori} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className='lg:mt-0 h-screen'>
          <Header auth={auth} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl h-[calc(100%_-_4rem)] mx-auto md:h-[calc(100%_-_4rem)] overflow-auto">
            <Banner className="w-full mb-4" isClosed={true} type="info" open={true}>
              Setelah Mencoba Aplikasi, Anda Bisa Mengisi<br />
              <a className='font-bold' href="https://docs.google.com/forms/d/e/1FAIpQLSfufb45t05tKB85LWprI0YNrt50DNiSa-SwxdkgCOtTWBI4ng/viewform?usp=sf_link">
                Form Berikut
              </a>
            </Banner>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
