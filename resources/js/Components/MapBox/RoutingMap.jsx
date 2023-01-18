import leaflet, { Icon } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import markerIcon from "leaflet/dist/images/marker-icon.png";
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
      return leaflet.marker(
        waypoint.latLng, {
        icon: new Icon({
          html: '<h1>hehe</h1>',
          iconUrl: markerIcon,
          iconSize: [18, 30],
          iconAnchor: [12, 41]
        })
      })
        .bindPopup(
          ReactDOMServer.renderToString(
            <AntarJemputCard order={orders[1]} type={orderType} key={i} />,
            { autoClose: false }
          )
        )
        .openPopup();
    }
  });

  // On Routes Found Handle
  // instance.on('routesfound', function (e) {
  //   var routes = e.routes;
  //   var summary = routes[0].summary;
  //   console.log('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
  // });

  return instance;
};

const RoutingMap = createControlComponent(createRoutingMachineLayer);
export default RoutingMap;