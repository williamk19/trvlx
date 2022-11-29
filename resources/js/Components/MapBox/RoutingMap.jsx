import leaflet, { Icon } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const createRoutingMachineLayer = ({ waypoints }) => {
  const instance = leaflet.Routing.control({
    waypoints: waypoints,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    addWaypoints: false,
    draggableWaypoints: false,
    collapsible: true,
    show: false,
    showAlternatives: false,
    createMarker: (i, waypoint, n) => {
      return leaflet.marker(
        waypoint.latLng, {
        icon: new Icon({
          iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41]
        })
      });
    }
  });

  return instance;
};

const RoutingMap = createControlComponent(createRoutingMachineLayer);
export default RoutingMap;