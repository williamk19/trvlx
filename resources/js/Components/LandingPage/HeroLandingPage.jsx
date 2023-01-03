import { Link } from '@inertiajs/inertia-react';
import Typewriter from 'typewriter-effect';
import PrimaryButton from '../PrimaryButton';

const HeroLandingPage = () => {
  return (
    <div className='hero bg-gradient-to-r from-cyan-500 to-blue-500 pb-8 md:pb-20'>
      <div className="max-w-6xl w-11/12 mt-24 md:mt-30 sm:mt-24 lg:mt-32">
        <div className="hero-content flex-col gap-x-24 p-0 lg:flex-row-reverse">
          <div className="text-center mt-5 md:mt-10 w-11/12 lg:w-8/12">
            <h1 className="text-4xl md:text-7xl md:mb-10 font-semibold text-shadow-lg text-white">Sewa Mobil Hiace, Elf, Bus, Tour Travel Wisata
              <strong>
                <Typewriter
                  options={{
                    strings: ['Jawa Bali', 'Jakarta', 'Surabaya', 'Malang'],
                    autoStart: true,
                    loop: true
                  }}
                />
              </strong>
            </h1>
            <p className="py-6 text-md md:text-xl text-white text-shadow-lg">Dengan Armada Transportasi yang Sehat, Bersih, Harum, pelayanan yang maksimal dan didukung oleh Driver Ramah Profesional serta Customer Service yang fast respon selama 24 jam akan membuat Anda semakin nyaman di perjalanan.
            </p>
            <Link href={route('login')}>
              <PrimaryButton className='border-none shadow-md font-bold text-lg bg-slate-50 text-black hover:bg-slate-200 active:hover:bg-slate-200'>
                Pesan Travel Sekarang
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HeroLandingPage;