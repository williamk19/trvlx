import { createControlComponent } from "@react-leaflet/core";
import Geocoder from 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const createGeocoderLayer = () => {
  const instance = new Geocoder({
    defaultMarkGeocode: false,
    geocoder: L.Control.Geocoder.nominatim(),
  }).on('markgeocode', function (e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  return instance;
};

const GeoSearchMap = createControlComponent(createGeocoderLayer);
export default GeoSearchMap;