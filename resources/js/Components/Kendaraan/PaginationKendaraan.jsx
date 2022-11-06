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
            <button className="btn bg-white border-slate-200 hover:bg-slate-300 hover:border-slate-300 text-indigo-500">&lt;- Previous</button>
          </li>
          <li className="ml-3" onClick={handleNextClick}>
            <a className="btn bg-white border-slate-200 hover:bg-slate-300 hover:border-none hover:border-slate-300 text-indigo-500">Next -&gt;</a>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600">{firstIndex + 1}</span> to <span className="font-medium text-slate-600">{lastIndex}</span> of <span className="font-medium text-slate-600">{dataLength}</span> results
      </div>
    </div>
  );
};

export default PaginationKendaraan;