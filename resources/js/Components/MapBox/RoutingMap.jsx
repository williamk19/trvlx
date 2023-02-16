import leaflet, { Icon } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import icons from "leaflet-color-number-markers";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import AntarJemputCard from '../Sopir/Antar/AntarJemputCard';

const createRoutingMachineLayer = ({ ordersRoute, orderType }) => {
  const instance = leaflet.Routing.control({
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 5 }]
    },
    route: L.Routing.osrmv1({
      timeout: 2000,
      profile: 'driving'
    }),
    showAlternatives: false,
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    show: false,
    createMarker: (i, waypoint, n) => {
      if (i === 0) {
        return leaflet.marker(
          waypoint.latLng, {
          icon: new Icon({
            html: '<h1>hehe</h1>',
            iconUrl: markerIcon,
            iconSize: [25, 40],
            iconAnchor: [12, 41]
          })
        })
          .bindPopup(
            ReactDOMServer.renderToString(
              <div className='p-4'>
                <h1 className='text-xl font-semibold'>Ini Lokasi Anda</h1>
              </div>,
              { autoClose: false }
            )
          );
      } else {
        let order;
        if (orderType === 'jemput') {
          order = ordersRoute[ordersRoute
            .findIndex((o) => o.lokasi.lat_asal == waypoint.latLng.lat && o.lokasi.lng_asal == waypoint.latLng.lng)];
        } else if (orderType === 'antar') {
          order = ordersRoute[ordersRoute
            .findIndex((o) => o.lokasi.lat_tujuan == waypoint.latLng.lat && o.lokasi.lng_tujuan == waypoint.latLng.lng)];
        }

        return leaflet.marker(
          waypoint.latLng, {
          icon: icons.blue.numbers[i]
        })
          .bindPopup(
            ReactDOMServer.renderToString(
              <AntarJemputCard order={order} type={orderType} key={i} cardId={i} />,
              { autoClose: false }
            )
          );
      }
    }
  });

  return instance;
};

const RoutingMap = createControlComponent(createRoutingMachineLayer);
export default RoutingMap;
