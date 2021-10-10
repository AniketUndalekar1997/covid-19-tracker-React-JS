import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  console.log(Array.isArray(countries) && countries.length);

  // const validateMap = () => {
  //   if (countries.length) {
  //     showDataOnMap(countries, casesType);
  //   } else {
  //     return;
  //   }
  // };

  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries.length ? showDataOnMap(countries, casesType) : ""}

        {/* {validateMap} */}
      </LeafletMap>
    </div>
  );
}

export default Map;
