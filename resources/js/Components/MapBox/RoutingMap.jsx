import leaflet, { Icon } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";


const createRoutingMachineLayer = ({ waypoints }) => {
  // console.log(waypoints);
  const instance = leaflet.Routing.control({
    // waypoints: [
    //   [-7.289393, 112.721202],
    //   [-7.343097, 112.757392],
    //   [-7.253835, 112.755815],
    //   [-7.309898, 112.753856],
    //   [-7.319468, 112.72772]
    //   // L.latLng(57.74, 11.94),
    //   // L.latLng(57.6792, 11.949)
    // ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 5 }]
    },
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
      });
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