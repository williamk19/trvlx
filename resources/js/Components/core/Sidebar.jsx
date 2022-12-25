import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import Logo from '@/assets/images/logo.png';
import LogoSmall from '@/assets/images/logo-small.png';
import { 
  UsersIcon, 
  TvIcon, 
  TruckIcon, 
  TicketIcon, 
  MapIcon 
} from '@heroicons/react/24/solid';
import _ from 'lodash';

function Sidebar({ role, sidebarOpen, setSidebarOpen }) {
  const { url } = usePage();
  const pathname = url;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');
  const [sidebarMenu, setSidebarMenu] = useState([{}]);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    switch (parseInt(role)) {
      case 1:
        setSidebarMenu([
          { name: 'dashboard', slug: 'dashboard', url: '/dashboard', icon: <TvIcon className='w-5 ' /> },
          { name: 'order', slug: 'order', url: '/order', icon: <TicketIcon className='w-5 ' /> },
          { name: 'layanan', slug: 'layanan', url: '/layanan', icon: <MapIcon className='w-5 ' /> },
          { name: 'kendaraan', slug: 'kendaran', url: '/kendaraan', icon: <TruckIcon className='w-5 ' /> },
          { name: 'user', slug: 'user', url: '/user', icon: <UsersIcon className='w-5 ' /> }
        ]);
        break;
      case 2:
        setSidebarMenu([
          { name: 'dashboard', url: '/dashboard', icon: <TvIcon className='w-5 ' /> },
          { name: 'order', url: '/order', icon: <TicketIcon className='w-5 ' /> },
          { name: 'layanan', url: '/layanan', icon: <MapIcon className='w-5 ' /> },
          { name: 'kendaraan', url: '/kendaraan', icon: <TruckIcon className='w-5 ' /> },
          { name: 'user', url: '/user', icon: <UsersIcon className='w-5 ' /> }
        ]);
        break;
      case 3:
        setSidebarMenu([
          { name: 'dashboard', url: '/dashboard', icon: <TvIcon className='w-5 ' /> },
        ]);
        break;
      case 4:
        setSidebarMenu([
          { name: 'dashboard', url: '/dashboard', icon: <TvIcon className='w-5 ' /> },
          { name: 'order travel', url: '/client-order/data', icon: <TicketIcon className='w-5 ' /> },
        ]);
        break;
      default:
        setSidebarMenu([
          { name: 'dashboard', url: '/dashboard', icon: <TvIcon className='w-5 ' /> },
        ]);
        break;
    }
  }, []);

  return (
    <div>
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        <div className={`flex justify-between mb-24 ${sidebarExpanded && ("pr-3 sm:px-2")}`}>
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          <Link to="/" className="btn btn-ghost btn-md px-1 normal-case text-xl">
            {sidebarExpanded ? (
              <img src={Logo} className='w-28' />
            ) : (
              <img src={LogoSmall} className='w-8' />
            )}
          </Link>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden text-center w-6" aria-hidden="true">
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block">Pages</span>
            </h3>
            <ul className="mt-3">
              {sidebarMenu.map((menuData, idx) => (
                <li key={idx} className={`px-3 py-2 rounded-lg mb-2 last:mb-0 ${pathname.includes(menuData.url) && 'bg-slate-900'}`}>
                  <Link
                    href={menuData.url}
                    className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes(menuData.url) && 'hover:text-slate-200'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grow flex items-center">
                        {menuData.icon}
                        <span className="text-sm font-bold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          {_.capitalize(menuData.name)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-3 hidden lg:inline-flex justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;