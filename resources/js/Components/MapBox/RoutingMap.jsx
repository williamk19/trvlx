import leaflet from "leaflet";
import React, { useState } from 'react';
import { createControlComponent } from "@react-leaflet/core";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const createRoutingMachineLayer = ({ waypoints }) => {
  const instance = leaflet.Routing.control({
    waypoints: waypoints,
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    addWaypoints: false,
    draggableWaypoints: false,
    collapsible: true,
    show: false,
    showAlternatives: false
  });

  return instance;
};

const RoutingMap = createControlComponent(createRoutingMachineLayer);
export default RoutingMap;