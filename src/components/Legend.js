import zIndex from "@mui/material/styles/zIndex";
import React from "react";

const Legend = () => {
  const legendItems = [
    { color: "#839cdb", text: "40%+" },
    { color: "#97c0f1", text: "30%-40%" },
    { color: "#9be8e7", text: "20%-30%" },
    { color: "#b8ffdf", text: "10%-20%" },
    { color: "#e8fff2", text: "0%-10%" },
  ];

  // Render legend items
  const renderLegendItems = () => {
    return legendItems.map((item, index) => {
      return (
        <div key={index} style={{ display: "flex" }}>
          <div
            style={{
              backgroundColor: item.color,
              width: "20px",
              height: "20px",
            }}
          ></div>
          <div>{item.text}</div>
        </div>
      );
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          bottom: "2px",
          right: "2px",
          backgroundColor: "white",
          padding: "5px",
          zIndex: 1000,
        }}
      >
        <span style={{ fontWeight: "bold" }}>Legend</span>
        {renderLegendItems()}
      </div>
    </div>
  );
};

export default Legend;
