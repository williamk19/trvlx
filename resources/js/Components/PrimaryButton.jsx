import React from 'react';

export default function PrimaryButton({ type = 'submit', className = '', processing, children }) {
    return (
        <button
            type={type}
            className={
                `btn inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 disabled:text-gray-900 transition ease-in-out duration-150 ${
                    processing && 'loading'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
