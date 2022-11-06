import React from 'react';

const SearchForm = ({ handleSearch, placeholder }) => {
  return (
    <form className="relative h-full">
      <label htmlFor="action-search" className="sr-only">Search</label>
      <input onChange={(e) => handleSearch(e)} id="action-search" className="form-input text-black pl-9 h-full rounded-md focus:border-slate-300" type="search" placeholder={placeholder} />
      <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
        <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
          <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
        </svg>
      </button>
    </form>
  );
};

SearchForm.defaultProps = {
  placeholder: 'Search…'
};

export default SearchForm;