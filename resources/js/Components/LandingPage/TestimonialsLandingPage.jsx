import React from 'react';
import Slider from 'react-slick';
import TestimonialCard from '../Core/TestimonialCard';

const TestimonialsLandingPage = () => {
  const settings = {
    dots: true,
    arrows: true,
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
      occupation: 'Mahasiswa',
      desc: 'Paket hemat untuk liburan yang menyenangkan'
    },
    {
      nama: 'Dona',
      occupation: 'Mahasiswa',
      desc: 'Layanan sangat memuaskan'
    },
  ] 

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center max-w-2xl mb-11 text-center'>
        <h1 className='mb-5 leading-8 text-4xl font-bold'>Testimonial</h1>
        <p className='text-lg'>
          Testimonial dari para jajaran yang terregistrasi menggunakan layanan kami.
        </p>
      </div>
      <Slider className='mb-16 p-5 w-10/12 md:w-6/12 lg:w-4/12 items-center' {...settings}>
        {testimonialData.map((data, idx) => (
          <TestimonialCard key={idx} data={data} />
        ))}
      </Slider>
    </div>
  )
}

export default TestimonialsLandingPage;