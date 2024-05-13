import React, { useEffect, useState } from "react";
import "../index.css";
import { FaRepublican, FaDemocrat } from "react-icons/fa";
import { flexbox } from "@mui/system";

const StateSummary = ({ selectedState }) => {
  const [stateSummary, setStateSummary] = useState({
    representativeStats: {},
  });

  useEffect(() => {
    const getSummary = async () => {
      if (!selectedState) return;
      const stateCode = selectedState === "New York" ? "NY" : "SC";
      const response = await fetch(
        `http://localhost:8081/api/v2/summary/${stateCode}`
      );

      const data = await response.json();
      setStateSummary(data);
    };
    getSummary();
  }, [selectedState]);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const renderRacesSummary = () =>
    ["White", "Black", "Hispanic", "Asian"].map((race, idx) => {
      let extra = "";
      if (race === "Hispanic") extra = "Latino";

      const label = {
        fontFamily: "Verdana",
        fontSize: "0.75em",
        fontWeight: "bold",
        marginBottom: "5px",
      };

      return (
        <div>
          <h3
            style={{
              fontSize: "1em",
              marginBottom: "5px",
              fontWeight: "normal",
              backgroundColor: "rgba(200,200,200, 0.25)",
              borderRadius: "3px",
              textAlign: "center",
              padding: "5px 2px",
            }}
          >
            {race.toUpperCase()}
          </h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={label}>Population</span>
            <span>{formatNumber(stateSummary["total" + race + extra])}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={label}>Representatives</span>
            <span>
              {stateSummary.representativeStats[race.toLowerCase() + extra]}
            </span>
          </div>
        </div>
      );
    });

  return (
    <div
      className="left-col-box"
      style={{ background: "#fff", marginBottom: "20px" }}
    >
      <div
        style={{
          padding: "15px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            width: "75%",
            textAlign: "center",
            borderBottom: "1px solid rgba(70, 200, 236)",
            marginBottom: "15px",
          }}
        >
          {selectedState} Population{" "}
          {formatNumber(stateSummary.totalPopulation)}
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: "23px",
          }}
        >
          {[
            {
              name: "Democratic",
              short: "Dem",
              highlight: "highlight-summary-dem",
              icon: (
                <FaDemocrat
                  style={{ color: "blue", width: "50px", height: "50px" }}
                />
              ),
            },
            {
              name: "Republican",
              short: "Rep",
              highlight: "highlight-summary-rep",
              icon: (
                <FaRepublican
                  style={{ color: "red", width: "50px", height: "50px" }}
                />
              ),
            },
          ].map(({ name, short, icon, highlight }) => {
            const repCount =
              stateSummary.representativeStats[short.toLowerCase()];
            const largerRepCount = Math.max(
              stateSummary.representativeStats["dem"],
              stateSummary.representativeStats["rep"]
            );
            const isLarger = repCount === largerRepCount;

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {icon}
                <div style={{ marginLeft: "15px" }}>
                  <h3
                    className={isLarger ? highlight : ""}
                    style={{
                      marginBottom: "10px",
                      padding: isLarger ? "5px" : "0",
                      borderRadius: isLarger ? "8px" : "0",
                    }}
                  >
                    {name}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Representatives</span>
                    <span
                      style={{
                        fontSize: "1.1em",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                    >
                      {stateSummary.representativeStats[short.toLowerCase()]}
                    </span>
                    <span>Distribution</span>
                    <span style={{ fontSize: "1.1em", fontWeight: "bold" }}>
                      {Math.round(stateSummary["percent" + short + "Votes"])}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {renderRacesSummary()}
        </div>
      </div>
    </div>
  );
};

export default StateSummary;
