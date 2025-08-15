'use client';
import React, { useEffect } from "react";
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js'; // world map

const WorldMap = () => {
  useEffect(() => {
    const map = new jsVectorMap({
      map: 'world',
      selector: '#map',
      zoomOnScroll: false,
      zoomButtons: false,
      regionStyle: {
        initial: {
          fill: "#dcdcdc"
        }
      },
      focusOn: {
        x: 0.62,  // Adjust horizontally
        y: 1.2,   // Adjust vertically
        scale: 7  // Zoom level
      },
      markers: [
        { name: "Addis Ababa", coords: [9.03, 38.74] },
        { name: "Bahir Dar", coords: [11.6, 37.38] },
        { name: "Hawassa", coords: [7.06, 38.47] },
        { name: "Dire Dawa", coords: [9.6, 41.866] },
        { name: "Mekelle", coords: [13.5, 39.5] }
      ],
      markerStyle: {
        initial: {
          fill: "#947e03",
          stroke: "#000",
          r: 6
        },
        hover: {
          fill: "#fff",
          stroke: "#947e03"
        }
      },
      labels: {
        markers: {
          render: marker => marker.name
        }
      }
    });

    return () => map.destroy(); // cleanup on unmount
  }, []);

  return (
    <div className="w-full h-[300px] jvm-container">
      <div id="map" className="w-full h-full"></div>
    </div>
  );
};

export default WorldMap;
