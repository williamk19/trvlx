import best from '@/assets/icon/best.svg';
import approve from '@/assets/icon/approve.svg';
import support from '@/assets/icon/support.svg';

const BenefitsLandingPage = () => {
  return (
    <div className='text-center mb-14 md:mb-32 w-11/12 max-w-6xl pt-16 sm:pt-32'>
      <div className='flex w-full justify-center'>
        <div className='flex flex-col box-shadow-2xl items-center max-w-2xl mb-11'>
          <h1 className='mb-5 text-3xl text-shadow md:text-4xl font-bold'>Kemudahan dengan TRVLX</h1>
          <p className='text-lg text-shadow'>
            Banyak benefit yang didapatkan dengan menggunakkan jasa travel dengan Skytravelink dengan layanan support admin dan juga pelayanan travel yang terbaik.
          </p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-x-4 justify-between items-center px-0 md:px-10'>
        <div className='border shadow-lg flex flex-col mb-5 rounded-lg max-w-xs p-8 justify-center items-center transition-all duration-500 hover:scale-100 md:hover:scale-110'>
          <img className='w-16 h-16 mb-4' src={best} />
          <h3 className='font-bold text-lg mb-2'>Pelayanan Terbaik</h3>
          <p className='text-sm'>Menyediakan pelayanan terbaik dengan banyak pilihan layanan</p>
        </div>
        <div className='border shadow-lg flex flex-col mb-5 rounded-lg max-w-xs p-8 justify-center items-center transition-all duration-500 hover:scale-100 md:hover:scale-110'>
          <img className='w-16 h-16 mb-4' src={approve} />
          <h3 className='font-bold text-lg mb-2'>Pemesanan Mudah</h3>
          <p className='text-sm'>Menyediakan pelayanan terbaik dengan banyak pilihan layanan</p>
        </div>
        <div className='border shadow-lg flex flex-col mb-5 rounded-lg max-w-xs p-8 justify-center items-center transition-all duration-500 hover:scale-100 md:hover:scale-110'>
          <img className='w-16 h-16 mb-4' src={support} />
          <h3 className='font-bold text-lg mb-2'>Support Yang Cepat</h3>
          <p className='text-sm'>Menyediakan pelayanan terbaik dengan banyak pilihan layanan</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsLandingPage;
