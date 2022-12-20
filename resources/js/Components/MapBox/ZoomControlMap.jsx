import { createControlComponent } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";
import Locate from "leaflet.locatecontrol";

const createZoomLayer = () => {
  const instance = new Locate({
    position: "bottomleft",
    strings: {
      title: "Show me where I am, yo!"
    },
    locateOptions: {
      watch: true,
      enableHighAccuracy: true
    }
  })
  return instance;
};

const ZoomControlMap = createControlComponent(createZoomLayer);
export default ZoomControlMap;