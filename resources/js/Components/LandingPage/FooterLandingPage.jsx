const FooterLandingPage = () => {
  return (
    <div data-theme='dark' className='w-full flex items-center flex-col'>
      <footer className="footer flex flex-col lg:flex-row justify-between max-w-6xl py-10 w-11/12 text-base-content font-semibold text-sm md:text-base">
        <div className='w-full lg:w-4/12'>
          <span className="footer-title">About Us</span>
          <a className="link link-hover">
            Villa Puncak Tidar Malang Garasi : Jl. Kh Malik Dalam Buring Kedungkandang – Malang, perum Magersari Permai Sidoarjo Jawa Timur – Indonesia
          </a>
          <a className="link link-hover">
            +62 895-3755-66767
          </a>
          <a className="link link-hover">
            skytravelink@gmail.com
          </a>
        </div>
        <div className='flex flex-col md:flex-row w-full lg:w-7/12 gap-8'>
          <div className='flex flex-col w-6/12 gap-2'>
            <span className="footer-title">Hubungi Kami</span>
            <a className="link link-hover">
              Tel 1: 081336227568
            </a>
            <a className="link link-hover">
              Tel 2: 0895375566767
            </a>
            <a className="link link-hover">
              Whatsapp: 081336227568
            </a>
            <a className="link link-hover">
              Email: skytravelink@gmail.com
            </a>
          </div>
          <div>
            <span className="footer-title">Lokasi Kami</span>
            <iframe className='mt-4' style={{
              width: "100%",
              height: "200px",
              frameBorder: '0',
              scrolling: 'no',
              marginHeight: '0',
              marginWidth: '0',
            }}
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Malang+(My%20Business%20Name)&t=&z=14&ie=UTF8&iwloc=B&output=embed">
              <a href="https://www.maps.ie/distance-area-calculator.html">
                distance maps
              </a>
            </iframe>
          </div>
        </div>
        
      </footer>
      <footer className="footer max-w-6xl py-4 w-11/12 border-t text-base-content border-base-300 flex justify-center">
        <div className="items-center grid-flow-col">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
          <p>Skytravel Link <br />Sewa Mobil Hiace Elf Bus Tour Travel Wisata</p>
        </div>
      </footer>
    </div>
  );
};

export default FooterLandingPage;