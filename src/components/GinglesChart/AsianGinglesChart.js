import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Button } from "@mui/material";

ChartJS.register(LinearScale, Title, Tooltip, Legend, PointElement);

const AsianAssemblyScatterPlot = ({ selectedState, showChart }) => {
  const [assemblyData, setAssemblyData] = useState([]);

  let statecode = "";

  useEffect(() => {
    const getAssemblyData = async () => {
      statecode = selectedState === "New York" ? "NY" : "SC";
      const response = await fetch(
        `http://localhost:8081/api/v2/NLR/${statecode}`
      );
      const data = await response.json();
      setAssemblyData(data);
    };
    getAssemblyData();
  }, [selectedState]);

  statecode = selectedState === "New York" ? "NY" : "SC";

  const scenario = `${statecode}_ASIAN`;
  const filter = "asian";

  const filteredDemData = assemblyData
    .filter((entry) => entry.race === filter)
    .map((entry) => ({
      x: entry.racialPercentage * 100,
      y: entry.electionStats.demShare * 100,
      label: entry.precinctID,
    }));

  const filteredRepData = assemblyData
    .filter((entry) => entry.race === filter)
    .map((entry) => ({
      x: entry.racialPercentage * 100,
      y: entry.electionStats.repShare * 100,
      label: entry.precinctID,
    }));

  const scatterData = {
    datasets: [
      {
        label: "Democratic Vote Share",
        data: filteredDemData,
        backgroundColor: "#586da7",
        pointRadius: 1,
        pointHoverRadius: 1,
      },
      {
        label: "Republican Vote Share",
        data: filteredRepData,
        backgroundColor: "#c3413c",
        pointRadius: 1,
        pointHoverRadius: 1,
      },
    ],
  };

  const xValues = [];
  const yValuesDem = [];
  const yValuesRep = [];
  for (let x = 0; x <= 100; x += 0.1) {
    xValues.push(x);
  }

  const calculateDemocratValue = (x) => {
    if (scenario === "NY_WHITE") {
      return 87.0683 * Math.exp(-0.0061 * x);
    } else if (scenario === "NY_ASIAN") {
      return 58.6711 * Math.pow(x, 0.0616);
    } else if (scenario === "NY_HISPANIC") {
      return 44.7038 * Math.pow(x, 0.1498);
    } else if (scenario === "NY_BLACK") {
      return 50.5013 * Math.pow(x, 0.1417);
    } else if (scenario === "SC_WHITE") {
      return 110.3333 * Math.exp(-0.0148 * x);
    } else if (scenario === "SC_ASIAN") {
      return 45.7268 * Math.pow(x, 0.0266);
    } else if (scenario === "SC_HISPANIC") {
      return 44.8289 * Math.pow(x, 0.0166);
    } else if (scenario === "SC_BLACK") {
      return 29.9163 * Math.exp(0.0139 * x);
    }
  };

  const calculateRepublicanValue = (x) => {
    if (scenario === "NY_WHITE") {
      return 13.3159 * Math.exp(0.0155 * x);
    } else if (scenario === "NY_ASIAN") {
      return 38.6419 * Math.exp(-0.0088 * x);
    } else if (scenario === "NY_HISPANIC") {
      return 47.5557 * Math.exp(-0.0208 * x);
    } else if (scenario === "NY_BLACK") {
      return 48.7422 * Math.exp(-0.038 * x);
    } else if (scenario === "SC_WHITE") {
      return 1.5038 * Math.pow(x, 0.8661);
    } else if (scenario === "SC_ASIAN") {
      return 62.7268 * Math.pow(x, -0.0266);
    } else if (scenario === "SC_HISPANIC") {
      return 53.8495 * Math.pow(x, 0.0);
    } else if (scenario === "SC_BLACK") {
      return 77.4956 * Math.exp(-0.0153 * x);
    }
  };

  // Calculate y values for Democrat and Republican lines based on selected scenario
  for (let i = 0; i < xValues.length; i++) {
    const x = xValues[i];
    const dy = calculateDemocratValue(x);
    const ry = calculateRepublicanValue(x);
    yValuesDem.push(dy);
    yValuesRep.push(ry);
  }

  const lineDataDem = {
    labels: xValues,
    datasets: [
      {
        label: "Democrat Regression Line",
        data: yValuesDem.map((y, index) => ({ x: xValues[index], y })),
        backgroundColor: "#0000ff",
        borderWidth: 0.00000000001,
      },
    ],
  };

  const lineDataRep = {
    labels: xValues,
    datasets: [
      {
        label: "Republican Regression Line",
        data: yValuesRep.map((y, index) => ({ x: xValues[index], y })),
        backgroundColor: "#ff0000",
        borderWidth: 0.00000000001,
      },
    ],
  };

  return (
    <div
      className="left-col-box graphs"
      style={{
        backgroundColor: "#fff",
        height: "500px",
        marginBottom: "20px",
      }}
    >
      <Button onClick={() => showChart("")} style={{ padding: "0px" }}>
        Close
      </Button>
      <Scatter
        data={{
          datasets: scatterData.datasets
            .concat(lineDataRep.datasets)
            .concat(lineDataDem.datasets),
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            // Replace Black with {race} once the race selection is set up
            title: {
              display: true,
              text: `${selectedState} Asian Vote Share by Precinct`,
            },
            legend: { display: true },
          },
          scales: {
            x: { title: { display: true, text: "Ethnicity %" } },
            min: 0,
            max: 100,
            y: { title: { display: true, text: "Vote Share" } },
            min: 0,
            max: 100,
          },
        }}
      />
    </div>
  );
};

export default AsianAssemblyScatterPlot;
