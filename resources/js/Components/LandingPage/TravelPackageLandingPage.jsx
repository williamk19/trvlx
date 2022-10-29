import bromo from '@/assets/images/bromo.jpg';
import surabaya from '@/assets/images/surabaya.jpg';
import jakarta from '@/assets/images/jakarta.jpg';
import jogja from '@/assets/images/jogja.jpg';
import madura from '@/assets/images/madura.jpg';
import malang from '@/assets/images/malang.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid';
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
  ]

  return (
    <div className='mb-14 bg-slate-100 text-center w-full p-20'>
      <div className='max-w-6xl m-auto'>
        <div className='flex w-full justify-center'>
          <div className='flex w-full justify-between mb-11'>
            <h1 className='mb-4 leading-8 text-2xl font-bold'>Destinasi Favorit</h1>
            <div>
              <a className='link leading-8 text-lg inline font-bold'>
                Lihat Tujuan Lainnya
              </a>
              <ArrowSmallRightIcon className='w-6 inline' />
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