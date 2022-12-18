import { useMap } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import RoutingMap from './RoutingMap';
import "leaflet/dist/leaflet.css";

const tempDestination = [-7.4323535, 112.7205893];
const BoxRouteMap = ({ watchType = false, destination = tempDestination }) => {
  const routingMachine = useRef();
  const [host, setHost] = useState([]);
  let waypoints = [];

  const map = useMap();
  useEffect(() => {
    map
      .locate({
        enableHighAccuracy: true,
        watch: {watchType}
      })
      .on("locationfound", function (e) {
        map.flyTo(e.latlng, 15);
        map.on('zoomend', () => {
          setHost([e.latlng.lat, e.latlng.lng]);
        });
      });
  }, [map]);

  useEffect(() => {
    if (routingMachine.current) {
      let waypoints = [
        host, destination
      ];
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