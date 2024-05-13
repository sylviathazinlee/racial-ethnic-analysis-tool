import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../index.css";
import { Button, Select, MenuItem } from "@mui/material";
import DistrictTileMap from "./DistrictTileMap";
import Legend from "./Legend";

const stateCenters = {
  NewYork: [42.913397, -75.596272],
  SouthCarolina: [33.836081, -81.163725],
};

const stateBounds = {
  NewYork: [
    [37.477399, -79.76259],
    [45.01585, -71.856228],
  ],
  SouthCarolina: [
    [27.033454, -83.353928],
    [36.215402, -78.54203],
  ],
};

const StateMap = ({ selectedState, selectedDistrict }) => {
  const [layer, setLayer] = useState("districts");
  const [showDistricts, setShowDistricts] = useState(true);
  const [geoJsonData, setGeoJsonData] = useState(null);

  const [selectedRace, setSelectedRace] = useState("white");

  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (layer === "districts") {
      const state = selectedState === "New York" ? "NY" : "SC";
      fetch(`http://localhost:8081/api/v2/districts/${state}`)
        .then((response) => response.json())
        .then((data) => setGeoJsonData(data))
        .catch(console.error);
    }
  }, [selectedState, layer]);

  const toggleDistricts = () => {
    setShowDistricts(!showDistricts);
  };

  return (
    <>
      <MapContainer
        center={stateCenters[selectedState.replace(" ", "")]}
        zoom={8}
        id="map"
        key={selectedState}
        maxBounds={stateBounds[selectedState.replace(" ", "")]}
        minZoom={7}
      >
        <DistrictTileMap
          showDistricts={showDistricts}
          geoJsonData={geoJsonData}
          layer={layer}
          selectedRace={selectedRace}
          selectedDistrict={selectedDistrict}
        />
      </MapContainer>

      <div className="hideDistrictButton">
        <Button onClick={toggleDistricts} color="inherit">
          {showDistricts ? "Hide District Plan" : "Show District Plan"}
        </Button>
        <select onChange={handleRaceChange}>
          <option>White</option>
          <option>Black</option>
          <option>Hispanic/Latino</option>
          <option>Asian</option>
        </select>
      </div>

      <Legend />
    </>
  );
};

export default StateMap;
