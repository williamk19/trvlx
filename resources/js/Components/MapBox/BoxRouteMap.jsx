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
  const [ordersRoute, setOrdersRoute] = useState([]);
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

      let ordersPath = [];
      const arrOfPath = tspNearestNeighbor(points).map((p) => {
        if (orderType === "jemput") {
          const order = orders[orders
            .findIndex((o) => o.lokasi.lat_asal === p.lat && o.lokasi.lng_asal === p.lng)];
          ordersPath.push(order);
        } else if (orderType === "antar") {
          const order = orders[orders
            .findIndex((o) => o.lokasi.lat_tujuan === p.lat && o.lokasi.lng_tujuan === p.lng)];
          ordersPath.push(order);
        }

        return [p.lat, p.lng];
      });

      setOrdersRoute(ordersPath);
      let waypoints = [initialHost, ...arrOfPath];
      routingMachine.current.setWaypoints(waypoints);
    }
  }, [initialHost, destination]);

  return (
    <>
      <RoutingMap
        ref={routingMachine}
        orderType={orderType}
        waypoints={waypoints}
        ordersRoute={ordersRoute}
        orders={ordersRoute}
      />
    </>
  );
};

export default BoxRouteMap;
