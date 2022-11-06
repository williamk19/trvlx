import React from 'react'

const FormAddKendaraan = () => {
  return (
    <div data-theme="light" className='rounded-lg p-8 shadow-lg lg:w-8/12'>
      <div>
        <form>
          <div className="space-y-4">
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="card-name">
                  Nama Kendaraan
                </label>
                <input id="card-name" className="form-input rounded-md w-full" type="text" placeholder='Innova, Hiace, Terios'/>
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="card-surname">
                  Merk Kendaraan
                </label>
                <input id="card-surname" className="form-input rounded-md w-full" type="text" placeholder='Toyota, Daihatsu' />
              </div>
            </div>
            <div className="md:flex space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="card-address">
                  Plat Nomor Kendaraan
                </label>
                <input id="card-address" className="form-input rounded-md w-full" type="text" placeholder='M129DC'/>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1" htmlFor="card-city">
                  Jumlah Seat Kendaraan
                </label>
                <input id="card-city" className="form-input rounded-md w-full" placeholder='5, 7, 13, ...' type="number" />
              </div>
            </div>
            <div className="text-right">
              <button type="submit" className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500">
                Tambahkan Mobil
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormAddKendaraan;