import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import DragMarkerMap from './DragMarkerMap';
import BoxRouteMap from './BoxRouteMap';
import "leaflet/dist/leaflet.css";
import GeoSearchMap from './GeoSearchMap';
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';

const BoxMap = ({
  type = 'pick',
  orderType = 'jemput',
  name,
  latlng,
  onLocationChange,
  orders = [],
  destination = []
}) => {
  return (
    <MapContainer
      className='w-full h-full rounded-2xl z-0'
      center={[-7.967394, 112.633363]}
      zoom={9}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {type === 'route' && (
        <BoxRouteMap
          orderType={orderType}
          orders={orders}
          destination={destination}
        />)}
      {type === 'pick' && <>
        <GeoSearchMap name={name} onLocationChange={onLocationChange} />
        <DragMarkerMap
          name={name}
          latlng={latlng}
          onLocationChange={onLocationChange}
        />
      </>}
      {orderType === 'jemput' && (
        <>
          <Marker
            icon={new Icon({ iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}
            position={[-7.999355, 112.648296]}>
            <Popup>
              Kantor Malang
            </Popup>
          </Marker>
          <Marker
            icon={new Icon({ iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}
            position={[-7.445115, 112.713006]}>
            <Popup>
              Kantor Sidoarjo
            </Popup>
          </Marker>
        </>
      )}

    </MapContainer>
  );
};


export default BoxMap;
