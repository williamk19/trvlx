import { useMap } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import RoutingMap from './RoutingMap';

const tempDestination = [-7.4323535, 112.7205893];

const BoxRouteMap = ({ destination = tempDestination }) => {
  const routingMachine = useRef();
  const [host, setHost] = useState([]);
  let waypoints = [];

  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng);
      setHost([e.latlng.lat, e.latlng.lng]);
    });
  }, [map]);

  useEffect(() => {
    if (routingMachine.current) {
      let waypoints = [
        host, destination
      ]
      routingMachine.current.setWaypoints(waypoints);
    }
  }, [host, destination]);

  return (
    <>
      <RoutingMap ref={routingMachine} waypoints={waypoints} />
    </>
  );
};

export default BoxRouteMap;