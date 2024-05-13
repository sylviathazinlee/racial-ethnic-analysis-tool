import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Button } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AssemblyBarChart = ({ selectedState, showChart }) => {
  const [assemblyData, setAssemblyData] = useState({
    representativeStats: {},
  });

  useEffect(() => {
    const getAssemblyData = async () => {
      const statecode = selectedState === "New York" ? "NY" : "SC";
      const response = await fetch(
        `http://localhost:8081/api/v2/summary/${statecode}`
      );
      const data = await response.json();
      setAssemblyData(data);
    };
    getAssemblyData();
  }, [selectedState]);

  const labels = ["White", "Black", "Hispanic/Latino", "Asian"];

  const totalPop =
    assemblyData.totalWhite +
    assemblyData.totalBlack +
    assemblyData.totalHispanicLatino +
    assemblyData.totalAsian;

  const divisionFactor = selectedState === "New York" ? 150 : 124;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Actual %",
        data: [
          (assemblyData.representativeStats.white / divisionFactor) * 100,
          (assemblyData.representativeStats.black / divisionFactor) * 100,
          (assemblyData.representativeStats.hispanicLatino / divisionFactor) *
            100,
          (assemblyData.representativeStats.asian / divisionFactor) * 100,
        ],
        backgroundColor: ["#4793AF"],
      },
      {
        label: "Expected % (Race Pop./Total Pop.)",
        data: [
          (assemblyData.totalWhite / totalPop) * 100,
          (assemblyData.totalBlack / totalPop) * 100,
          (assemblyData.totalHispanicLatino / totalPop) * 100,
          (assemblyData.totalAsian / totalPop) * 100,
        ],
        backgroundColor: ["#FFA500"],
      },
    ],
  };

  return (
    <div
      className="left-col-box graphs"
      style={{
        backgroundColor: "#fff",
        height: "350px",
        marginBottom: "20px",
      }}
    >
      <Button onClick={() => showChart("")} style={{ padding: "0px" }}>
        Close
      </Button>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: selectedState },
            legend: { display: true },
          },
          scales: {
            y: { title: { display: true, text: "Representatives %" } },
            x: { title: { display: true, text: "Ethnicity" } },
          },
        }}
      />
    </div>
  );
};

export default AssemblyBarChart;
