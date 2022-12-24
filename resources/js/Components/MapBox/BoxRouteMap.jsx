import { useMap } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import RoutingMap from './RoutingMap';
import ZoomControlMap from './ZoomControlMap';
import "leaflet/dist/leaflet.css";

const tempDestination = [-7.4323535, 112.7205893];
const BoxRouteMap = ({ watchType = false, destination = tempDestination }) => {
  const routingMachine = useRef();
  const [host, setHost] = useState([]);
  const [initialHost, setInitialHost] = useState([]);
  let waypoints = [];

  const map = useMap();
  useEffect(() => {
    map
      .locate({
        enableHighAccuracy: true,
      })
      .on("locationfound", function (e) {
        map.flyTo(e.latlng, 16);
        map.on('zoomend', () => {
          setInitialHost([e.latlng.lat, e.latlng.lng]);
        });
      });
  }, [])

  useEffect(() => {
    if (routingMachine.current) {
      let waypoints = [
        initialHost, destination
      ];
      routingMachine.current.setWaypoints(waypoints);
    }
  }, [initialHost, destination]);

  return (
    <>
      {/* <ZoomControlMap /> */}
      <RoutingMap ref={routingMachine} waypoints={waypoints} />
    </>
  );
};

export default BoxRouteMap;