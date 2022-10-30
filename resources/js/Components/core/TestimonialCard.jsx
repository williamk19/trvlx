import React from 'react';

const TestimonialCard = ({data}) => {
  return (
    <div className='flex h-56 justify-center items-center'>
      <div className="card w-96 h-4/5 bg-base-100 shadow-md">
        <div className="card-body">
          <h2 className="card-title">{data.nama}</h2>
          <p>⭐⭐⭐⭐⭐</p>
          <p>{data.desc}</p>
        </div>
      </div>
    </div>
    
  );
};

export default TestimonialCard;