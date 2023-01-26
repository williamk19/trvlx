import { useMap } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import RoutingMap from './RoutingMap';
import "leaflet/dist/leaflet.css";
import { tspNearestNeighbor } from '@/Utils/TspNearestNeighbor';

const tempDestination = [
  [-7.289393, 112.721202],
];

const BoxRouteMap = ({
  watchType = false,
  orderType = 'jemput',
  destination = tempDestination,
  orders = []
}) => {
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
  }, []);

  useEffect(() => {
    if (routingMachine.current) {
      const points = destination.map((d) => {
        return { lat: d[0], lng: d[1] };
      });
      const arrOfPath = tspNearestNeighbor(points).map((p) => [p.lat, p.lng]);

      let waypoints = [
        initialHost, ...arrOfPath
      ];
      routingMachine.current.setWaypoints(waypoints);
    }
  }, [initialHost, destination]);

  return (
    <>
      <RoutingMap
        ref={routingMachine}
        orderType={orderType}
        waypoints={waypoints}
        orders={orders} />
    </>
  );
};

export default BoxRouteMap;
