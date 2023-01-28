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
  const [initialHost, setInitialHost] = useState();
  const [ordersRoute, setOrdersRoute] = useState(orders);

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
    if (routingMachine.current && initialHost) {
      const points = destination.map((d) => {
        return { lat: d[0], lng: d[1] };
      });
      points.unshift({lat: initialHost[0], lng: initialHost[1]});
      const arrOfPath = tspNearestNeighbor(points).map((p) => {
        return [p.lat, p.lng];
      });
      arrOfPath.shift();
      let waypoints = [initialHost, ...arrOfPath];
      routingMachine.current.setWaypoints(waypoints);
    }
  }, [initialHost, destination]);

  return (
    <>
      <RoutingMap
        ref={routingMachine}
        orderType={orderType}
        ordersRoute={ordersRoute}
      />
    </>
  );
};

export default BoxRouteMap;
