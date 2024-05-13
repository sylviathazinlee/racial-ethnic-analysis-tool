import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import StatePage from "./components/StatePage";
import api from "./components/axiosConfig";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedState, setSelectedState] = useState(null);

  const handleHomeClick = () => {
    setCurrentPage("home");
    setSelectedState(null);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setCurrentPage("state");
  };

  const [displayTable, setDisplayTable] = useState("");
  const [showStateSummary, setShowStateSummary] = useState(false);
  const [displayChart, setDisplayChart] = useState("");

  const handleChartsClick = () => {
    setDisplayChart(!displayChart);
  };

  return (
    <div className="App">
      <Header
        onHomeClick={handleHomeClick}
        onStateSelect={handleStateSelect}
        showTable={(tableName) => setDisplayTable(tableName)}
        showChart={(chartName) => setDisplayChart(chartName)}
        displayStateSummary={() => setShowStateSummary(!showStateSummary)}
        handleChartsClick={handleChartsClick}
      />
      {currentPage === "home" && (
        <HomePage navigateToState={handleStateSelect} />
      )}
      {currentPage === "state" && (
        <StatePage
          key={selectedState}
          selectedState={selectedState}
          displayTable={displayTable}
          showTable={(tableName) => setDisplayTable(tableName)}
          showChart={(chartName) => setDisplayChart(chartName)}
          showStateSummary={showStateSummary}
          displayChart={displayChart}
        />
      )}
    </div>
  );
}

export default App;
