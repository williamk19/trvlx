import { useMap } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import RoutingMap from './RoutingMap';
import "leaflet/dist/leaflet.css";
import { sortByDistance } from 'sort-by-distance';

const tempDestination = [
  [-7.289393, 112.721202],
  [-7.253835, 112.755815],
  [-7.309898, 112.753856],
  [-7.319468, 112.72772],
  [-7.343097, 112.757392],
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
        return { x: d[0], y: d[1] };
      });
      const origin = { x: initialHost[0], y: initialHost[1] };
      const sortedDestination = sortByDistance(origin, points).map((d) => [d.x, d.y]).reverse();

      let waypoints = [
        initialHost, ...sortedDestination
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