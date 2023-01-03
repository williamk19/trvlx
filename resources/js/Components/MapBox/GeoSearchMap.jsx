import { createControlComponent } from "@react-leaflet/core";
import Geocoder from 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { useMap } from 'react-leaflet';

const createGeocoderLayer = ({ name, onLocationChange }) => {
  const map = useMap();
  const instance = new Geocoder({
    iconLabel: false,
    defaultMarkGeocode: false,
    placeholder: 'Cari Lokasi...',
    geocoder: L.Control.Geocoder.nominatim(),
  }).on('markgeocode', function (e) {
    const coords = [e.geocode.center.lat, e.geocode.center.lng];
    map.flyTo(coords);
    onLocationChange(name, { lat: coords[0], lng: coords[1] });
  });
  return instance;
};

const GeoSearchMap = createControlComponent(createGeocoderLayer);
export default GeoSearchMap;