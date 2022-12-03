import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import Logo from '@/assets/images/logo.png';
import LogoSmall from '@/assets/images/logo-small.png';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { url } = usePage();
  const pathname = url;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

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
              <li className={`px-3 py-2 rounded-lg mb-2 last:mb-0 ${pathname.includes('dashboard') && 'bg-slate-900'}`}>
                <Link
                  href='/dashboard'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('dashboard') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current text-slate-400 ${pathname.includes('dashboard') && 'text-indigo-300'}`}
                          d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                        />
                        <path
                          className={`fill-current text-slate-700 ${pathname.includes('dashboard') && '!text-indigo-600'}`}
                          d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                        />
                        <path
                          className={`fill-current text-slate-600 ${pathname.includes('dashboard') && 'text-indigo-500'}`}
                          d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                        />
                      </svg>
                      <span className="text-sm font-bold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Dashboard
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className={`px-3 py-2 rounded-lg mb-2 last:mb-0 ${pathname.includes('order') && 'bg-slate-900'}`}>
                <Link

                  href='/order'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('order') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${pathname.includes('order') && 'text-indigo-500'}`}
                        d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${pathname.includes('order') && 'text-indigo-300'}`}
                        d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                      />
                    </svg>
                    <span className="text-sm font-bold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Order Travel</span>
                  </div>
                </Link>
              </li>
              <li className={`px-3 py-2 rounded-lg mb-2 last:mb-0 ${pathname.includes('layanan') && 'bg-slate-900'}`}>
                <Link
                  href='/layanan'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('layanan') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-600 ${pathname.includes('layanan') && 'text-indigo-500'}`} d="M1 3h22v20H1z" />
                      <path
                        className={`fill-current text-slate-400 ${pathname.includes('layanan') && 'text-indigo-300'}`}
                        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                      />
                    </svg>
                    <span className="text-sm font-bold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Layanan Travel
                    </span>
                  </div>
                </Link>
              </li>
              <li className={`px-3 py-2 rounded-lg mb-2 last:mb-0 ${pathname.includes('kendaraan') && 'bg-slate-900'}`}>
                <Link
                  href='/kendaraan'
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('kendaraan') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                        <path
                          className={`fill-current text-slate-400 ${(pathname === '/' || pathname.includes('kendaraan')) && '!text-indigo-500'
                            }`}
                          d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                        />
                        <path
                          className={`fill-current text-slate-600 ${(pathname === '/' || pathname.includes('kendaraan')) && 'text-indigo-600'}`}
                          d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                        />
                        <path
                          className={`fill-current text-slate-400 ${(pathname === '/' || pathname.includes('kendaraan')) && 'text-indigo-200'}`}
                          d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                        />
                      </svg>
                      <span className="text-sm font-bold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Kendaraan
                      </span>
                    </div>

                  </div>
                </Link>
              </li>
              <li className={`px-3 py-2 rounded-lg mb-2 last:mb-0 ${pathname.includes('user') && 'bg-slate-900'}`}>
                <Link
                  href="/user"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('user') && 'hover:text-slate-200'
                    }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${pathname.includes('user') && 'text-indigo-500'}`}
                        d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${pathname.includes('user') && 'text-indigo-300'}`}
                        d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="text-sm font-bold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Pengguna
                    </span>
                  </div>
                </Link>
              </li>
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