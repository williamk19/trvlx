import { MapContainer, TileLayer } from 'react-leaflet';
import DragMarkerMap from './DragMarkerMap';
import BoxRouteMap from './BoxRouteMap';
import "leaflet/dist/leaflet.css";

const BoxMap = ({ type = 'pick' }) => {
  return (
    <div className="md:w-2/5 h-96" >
      <MapContainer 
        className='w-full h-full rounded-2xl z-0 shadow-2xl' 
        center={[-7.967394, 112.633363]} 
        zoom={16} 
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {type === 'route' 
          ? (<BoxRouteMap />) 
          : (<DragMarkerMap />)}
      </MapContainer>
    </div>

  );
};

export default BoxMap;