import bromo from '@/assets/images/bromo.jpg';
import surabaya from '@/assets/images/surabaya.jpg';
import jakarta from '@/assets/images/jakarta.jpg';
import jogja from '@/assets/images/jogja.jpg';
import madura from '@/assets/images/madura.jpg';
import malang from '@/assets/images/malang.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import TravelPackageCard from '../core/TravelPackageCard';

const TravelPackageLandingPage = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const travelData = [
    {
      cityFrom: 'Surabaya',
      cityTo: 'Malang',
      picUrl: malang
    },
    {
      cityFrom: 'Surabaya',
      cityTo: 'Bromo',
      picUrl: bromo
    },
    {
      cityFrom: 'Yogyakarta',
      cityTo: 'Surabaya',
      picUrl: jogja
    },
    {
      cityFrom: 'Jakarta',
      cityTo: 'Madura',
      picUrl: jakarta
    },
    {
      cityFrom: 'Malang',
      cityTo: 'Madura',
      picUrl: madura
    },
    {
      cityFrom: 'Jakarta',
      cityTo: 'Surabaya',
      picUrl: surabaya
    },
  ];

  return (
    <div className='mb-14 bg-sky-100 text-center w-full py-20 px-10 md:px-20 md:py-32'>
      <div className='max-w-6xl m-auto'>
        <div className='flex w-full justify-center'>
          <div className='flex gap-2 w-full justify-between items-center md:items-end mb-14 p-0 md:p-2 flex-col md:flex-row'>
            <div className='flex flex-col items-center md:items-start max-w-xl'>
              <h1 className='mb-4 leading-8 text-3xl font-bold text-shadow'>
                Destinasi Favorit
              </h1>
              <p className='text-lg text-shadow text-center md:text-start'>
                Beberapa destinasi travel yang kami sediakan
              </p>
            </div>
            <div className='flex'>
              <a className='link leading-8 text-lg inline font-bold text-shadow'>
                Lihat Tujuan Lainnya
              </a>
              <ArrowTopRightOnSquareIcon className='ml-2 w-5 inline text-shadow' />
            </div>
          </div>
        </div>
        <Slider {...settings}>
          {travelData.map((data, idx) => (
            <TravelPackageCard key={idx} data={data} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TravelPackageLandingPage;