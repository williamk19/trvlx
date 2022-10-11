import best from '@/assets/icon/best.svg';
import approve from '@/assets/icon/approve.svg';
import support from '@/assets/icon/support.svg';

const BenefitsLandingPage = () => {
  return (
    <div className='text-center mb-32'>
      <div className='flex w-full justify-center'>
        <div className='flex flex-col items-center max-w-2xl mb-11'>
          <h1 className='mb-4 leading-8 text-4xl font-bold'>Trvlx Benefit for User</h1>
          <p className='text-lg'>
            We are self-service data analytics software that lets you create visually appealing data visualizations and insightful dashboards in minutes.
          </p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-x-4 justify-between items-center'>
        <div className='border flex flex-col mb-5 rounded-lg max-w-xs p-8 justify-center items-center'>
          <img className='w-16 h-16 mb-4' src={best} />
          <h3 className='font-bold mb-2'>Pelayanan Terbaik</h3>
          <p className='text-sm'>Menyediakan pelayanan terbaik dengan banyak pilihan layanan</p>
        </div>
        <div className='border flex flex-col mb-5 rounded-lg max-w-xs p-8 justify-center items-center'>
          <img className='w-16 h-16 mb-4' src={approve} />
          <h3 className='font-bold mb-2'>Pemesanan Mudah</h3>
          <p className='text-sm'>Menyediakan pelayanan terbaik dengan banyak pilihan layanan</p>
        </div>
        <div className='border flex flex-col mb-5 rounded-lg max-w-xs p-8 justify-center items-center'>
          <img className='w-16 h-16 mb-4' src={support} />
          <h3 className='font-bold mb-2'>Support Yang Cepat</h3>
          <p className='text-sm'>Menyediakan pelayanan terbaik dengan banyak pilihan layanan</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsLandingPage;