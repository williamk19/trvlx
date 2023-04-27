import React from 'react';

export default function Checkbox({ name, value, handleChange }) {
  return (
    <input
      type="checkbox"
      name={name}
      checked={value}
      defaultChecked={value === true ? true : false}
      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      onChange={(e) => handleChange(e)}
    />
  );
}
