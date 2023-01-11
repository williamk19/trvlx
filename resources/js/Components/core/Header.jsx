import React from 'react';
import UserMenu from '@/Components/Utility/header/UserMenu';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid';

const Header = ({
  sidebarOpen,
  setSidebarOpen,
  auth
}) => {
  const buttonHelpHandler = (e) => {
    e.preventDefault();
    const phoneNumber = "+6285156384597";
    const text = "Hallo, Admin!";
    window.open("https://wa.me/" + phoneNumber + "?text=" + text);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex">
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <button
              className={`w-8 h-8 flex items-center justify-center bg-green-400 hover:bg-green-500 transition duration-150 rounded-full `}
              onClick={buttonHelpHandler}
            >
              <ChatBubbleBottomCenterIcon className='w-4 h-4 text-white' />
            </button>
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu auth={auth} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;