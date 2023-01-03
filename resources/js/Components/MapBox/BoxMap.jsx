import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import DragMarkerMap from './DragMarkerMap';
import BoxRouteMap from './BoxRouteMap';
import "leaflet/dist/leaflet.css";
import GeoSearchMap from './GeoSearchMap';

const BoxMap = ({ type = 'pick', name, latlng, onLocationChange }) => {
  return (
    <div className="w-full h-52 md:h-72 rounded-2xl" >
      <MapContainer
        className='w-full h-full rounded-2xl z-0'
        center={[-7.967394, 112.633363]}
        zoom={9}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {type === 'route'
          ? (<BoxRouteMap />)
          : (<DragMarkerMap
              watchType={true}
              name={name}
              latlng={latlng}
              onLocationChange={onLocationChange}
            />)}
        <GeoSearchMap name={name} onLocationChange={onLocationChange} />
      </MapContainer>
    </div>

  );
};

export default BoxMap;