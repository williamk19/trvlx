import React from 'react';


const TestimonialCard = ({ data }) => {
  return (
    <div className='flex flex-col px-4 pt-5 pb-2 md:px-12 md:pt-10 md:pb-6 justify-center items-center'>
      <div className="flex gap-10 w-10/12 items-center">
        <div className="avatar">
          <div className="w-16 h-16 drop-shadow-xl rounded-full">
            <img src={data.pic} />
          </div>
        </div>
        <div className="">
          <h2 className="text-2xl font-bold">{data.nama}</h2>
          <h2 className="text-lg font-normal">{data.occupation}</h2>
        </div>
      </div>

      <div className="card w-10/12 bg-base-100 text-start mt-6 mb-6">
        <p className='font-normal'>{data.desc}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;