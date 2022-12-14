import React, { useEffect, useRef } from 'react';

export default function TextInput({
  type = 'text',
  telp = false,
  disabled = false,
  placeholder = '',
  name,
  value,
  className,
  autoComplete,
  required,
  isFocused,
  handleChange,
}) {
  const input = useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-row items-start items-center mt-2 gap-4">
      {telp ? (<p className='text-black'>+62</p>) : ("")}
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled && true}
        className={
          `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm` +
          className
        }
        ref={input}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}
