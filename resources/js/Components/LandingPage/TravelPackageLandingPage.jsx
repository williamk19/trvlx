import bromo from '@/assets/images/bromo.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowSmallRightIcon } from '@heroicons/react/24/solid';

const TravelPackageLandingPage = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

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
          <div className='w-10 h-48 rounded-lg'>
            <div className="w-11/12 h-full bg-cover rounded-lg bg-center" style={{backgroundImage: `url(${bromo})`}}>
            </div>
          </div>
          <div className='w-10 h-48 rounded-lg'>
            <div className="w-11/12 h-full bg-cover rounded-lg bg-center" style={{backgroundImage: `url(${bromo})`}}>
            </div>
          </div>
          <div className='w-10 h-48 rounded-lg'>
            <div className="w-11/12 h-full bg-cover rounded-lg bg-center" style={{backgroundImage: `url(${bromo})`}}>
            </div>
          </div>
          <div className='w-10 h-48 rounded-lg'>
            <div className="w-11/12 h-full bg-cover rounded-lg bg-center" style={{backgroundImage: `url(${bromo})`}}>
            </div>
          </div>
          <div className='w-10 h-48 rounded-lg'>
            <div className="w-11/12 h-full bg-cover rounded-lg bg-center" style={{backgroundImage: `url(${bromo})`}}>
            </div>
          </div>
          <div className='w-10 h-48 rounded-lg'>
            <div className="w-11/12 h-full bg-cover rounded-lg bg-center" style={{backgroundImage: `url(${bromo})`}}>
            </div>
          </div>
          
        </Slider>
      </div>
    </div>
  );
};

export default TravelPackageLandingPage;