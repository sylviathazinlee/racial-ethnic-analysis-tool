import { TileLayer, GeoJSON } from "react-leaflet";
import React from "react";

// Define colorScale function
const colorScale = (percent) => {
  let color = "";
  let text = "";

  if (percent > 40) {
    color = "#839cdb";
    text = "+80%";
  } else if (percent > 30) {
    color = "#97c0f1";
    text = "+60%";
  } else if (percent > 20) {
    color = "#9be8e7";
    text = "+40%";
  } else if (percent > 10) {
    color = "#b8ffdf";
    text = "+20%";
  } else if (percent > 0) {
    color = "#e8fff2";
    text = "+1%";
  } else {
    return "#fff";
  }

  return { color, text };
};

export default ({
  geoJsonData,
  showDistricts,
  layer,
  selectedRace,
  selectedDistrict,
}) => {
  let renderDistricts = [];

  if (layer === "districts" && geoJsonData && showDistricts) {
    renderDistricts = geoJsonData.map((data) => {
      let population = 0;

      switch (selectedRace) {
        case "white":
          population = data.properties.white / data.properties.total;
          break;
        case "black":
          population = data.properties.black / data.properties.total;
          break;
        case "hispanic/latino":
          population = data.properties.hispanicLatino / data.properties.total;
          break;
        case "asian":
          population = data.properties.asian / data.properties.total;
          break;
        default:
          break;
      }

      const percent = Math.round(population * 100);

      console.log(percent, selectedRace);

      const { color } = colorScale(percent);

      const geoJsonStyles = {
        fillColor: color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.5,
      };

      if (data.districtID === selectedDistrict) {
        geoJsonStyles.weight = 5;
        geoJsonStyles.color = "#000";
      }

      return (
        <GeoJSON key={data.districtID} data={data} style={geoJsonStyles} />
      );
    });
  }

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {renderDistricts}
    </>
  );
};
