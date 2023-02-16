import { createControlComponent } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";
import Locate from "leaflet.locatecontrol";

const createZoomLayer = () => {
  const instance = new Locate({
    position: "bottomleft",
    setView: 'once',
    flyTo: true,
    showCompass: true,
    strings: {
      title: "Show me where I am, yo!"
    },
    keepCurrentZoomLevel: true,
    locateOptions: {
      enableHighAccuracy: true,
      watch: true,
    }
  })
  return instance;
};

const ZoomControlMap = createControlComponent(createZoomLayer);
export default ZoomControlMap;
