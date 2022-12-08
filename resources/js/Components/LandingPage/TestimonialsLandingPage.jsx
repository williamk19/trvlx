import React, { useRef } from 'react';
import Slider from 'react-slick';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import TestimonialCard from '../Core/TestimonialCard';

const TestimonialsLandingPage = () => {
  const slider = useRef(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const testimonialData = [
    {
      nama: 'Silvi',
      pic: 'https://i.pravatar.cc/150?img=4',
      occupation: 'Mahasiswa',
      desc: 'Paket hemat untuk liburan yang menyenangkan Paket hemat untuk liburan yang menyenangkan Paket hemat untuk liburan yang menyenangkan Paket hemat untuk liburan yang menyenangkan'
    },
    {
      nama: 'Dona',
      pic: 'https://i.pravatar.cc/150?img=30',
      occupation: 'Mahasiswa',
      desc: 'Layanan sangat memuaskan Paket hemat untuk liburan yang menyenangkan Paket hemat untuk liburan yang menyenangkan Paket hemat untuk liburan yang menyenangkan'
    },
    {
      nama: 'Dona',
      pic: 'https://i.pravatar.cc/150?img=40',
      occupation: 'Mahasiswa',
      desc: 'Layanan sangat memuaskan Paket hemat untuk liburan yang menyenangkan Paket hemat untuk liburan yang menyenangkan'
    },
  ];

  return (
    <div className='w-11/12 py-10 md:py-20 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center max-w-2xl mb-11 text-center'>
        <h1 className='mb-5 leading-8 text-4xl font-bold text-shadow'>
          Testimonial
        </h1>
        <p className='text-lg text-shadow'>
          Testimonial dari para jajaran yang ter-registrasi menggunakan layanan kami.
        </p>
      </div>
        <div className='flex w-11/12 max-w-4xl justify-center mt-8'>
          <button onClick={() => slider?.current?.slickPrev()}>
            <ChevronLeftIcon className='w-6' />
          </button>
          <Slider ref={slider} className='mb-16 w-full items-center' {...settings}>
            {testimonialData.map((data, idx) => (
              <TestimonialCard key={idx} data={data} />
            ))}
          </Slider>
          <button onClick={() => slider?.current?.slickNext()}>
            <ChevronRightIcon className='w-6' />
          </button>
        </div>
    </div>
  );
};

export default TestimonialsLandingPage;