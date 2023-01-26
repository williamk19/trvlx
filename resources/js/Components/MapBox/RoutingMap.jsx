import leaflet, { Icon } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import icons from "leaflet-color-number-markers";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import AntarJemputCard from '../Sopir/Antar/AntarJemputCard';

const createRoutingMachineLayer = ({ waypoints, orders, orderType }) => {
  const instance = leaflet.Routing.control({
    waypoints: waypoints,
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
    collapsible: false,
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
          )
          .openPopup();
      } else {
        return leaflet.marker(
          waypoint.latLng, {
          icon: icons.blue.numbers[i]
        })
          .bindPopup(
            ReactDOMServer.renderToString(
              <AntarJemputCard order={orders[i - 1]} type={orderType} key={i} />,
              { autoClose: false }
            )
          )
          .openPopup();
      }
    }
  });

  return instance;
};

const RoutingMap = createControlComponent(createRoutingMachineLayer);
export default RoutingMap;
