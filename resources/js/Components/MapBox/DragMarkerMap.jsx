import {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect
} from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";

const DragMarkerMap = () => {
  const center = {
    lat: -7.967394,
    lng: 112.633363,
  };

  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    map
      .locate({ 
        enableHighAccuracy: true,
      })
      .on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 15);
      });
  }, [map]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      icon={new Icon({ iconUrl: markerIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
    </Marker>
  );
};

export default DragMarkerMap;