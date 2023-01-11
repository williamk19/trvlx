import React, { useState } from 'react';
import Sidebar from '@/Components/core/Sidebar';
import Header from '@/Components/core/Header';

const AuthenticatedLayout = ({ auth, header, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={auth.user.id_kategori} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className='lg:mt-0 h-screen'>
          <Header auth={auth} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl h-[calc(100%_-_4rem)] mx-auto md:h-full overflow-scroll">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuthenticatedLayout;