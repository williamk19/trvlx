import React from 'react';

const PaginationKendaraan = ({ firstIndex, lastIndex, dataLength, handleNextClick, handlePrevClick }) => {

  if (lastIndex > dataLength) {
    lastIndex = dataLength;
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-5 first:ml-0 hover:border-none" onClick={handlePrevClick}>
            <button className="btn bg-white border-slate-200 hover:bg-slate-300 hover:border-slate-300 text-indigo-500">
              <span className='mr-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z" clipRule="evenodd" />
                </svg>
              </span>
              Previous
            </button>
          </li>
          <li className="ml-3" onClick={handleNextClick}>
            <a className="btn bg-white border-slate-200 hover:bg-slate-300 hover:border-none hover:border-slate-300 text-indigo-500">
              Next
              <span className='ml-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600">{firstIndex}</span> to <span className="font-medium text-slate-600">{lastIndex}</span> of <span className="font-medium text-slate-600">{dataLength}</span> results
      </div>
    </div>
  );
};

export default PaginationKendaraan;