import React from 'react'

const TravelPackageCard = ({data}) => {
  return (
    <div className='w-full flex justify-center h-48 rounded-lg mb-10'>
      <div className="w-11/12 h-full shadow-lg flex items-end bg-cover rounded-lg bg-center p-4" style={{ backgroundImage: `linear-gradient(0deg, rgba(34,34,34,1) 0%, rgba(255,255,255,0) 100%), url(${data.picUrl})` }}>
        <h1 className='font-bold text-gray-100'>
          {data.cityFrom} - {data.cityTo}
        </h1>
      </div>
    </div>
  )
}

export default TravelPackageCard;