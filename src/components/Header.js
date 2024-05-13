import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";

const Header = ({
  onHomeClick,
  onStateSelect,
  showTable,
  showChart,
  displayStateSummary,
}) => {
  const [tableAnchorEl, setTableAnchorEl] = useState(null);
  const [chartAnchorEl, setChartAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [ginglesMenuAnchorEl, setGinglesMenuAnchorEl] = useState(null);
  const [boxwhiskersAnchorEl, setboxwhiskersAnchorEl] = useState(null);
  const [eiAnchorEL, setEIAnchorEl] = useState(null);
  const [raceAnchorEl, setRaceAnchorEl] = useState(null);
  const [selectedRace, setSelectedRace] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [ensembleSummaryAnchor, setEnsembleSummaryAnchor] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTablesClick = (event) => {
    setTableAnchorEl(event.currentTarget);
    handleTabClick("tables");
  };

  const handleCloseTables = () => {
    setTableAnchorEl(null);
    setActiveTab(null);
    setEnsembleSummaryAnchor(null);
  };

  const handleTableSelect = (tableName) => {
    showTable(tableName);
    handleCloseTables();
  };

  const handleRaceSelection = (race) => {
    setSelectedRace(race);
  };

  const handleChartsClick = (event) => {
    setChartAnchorEl(event.currentTarget);
    handleTabClick("charts");
  };

  const handleCloseCharts = () => {
    setChartAnchorEl(null);
    setGinglesMenuAnchorEl(null); // Close the Gingles menu as well
    setActiveTab(null);
    setboxwhiskersAnchorEl(null);
    setEIAnchorEl(null);
    setRaceAnchorEl(null);
    setEnsembleSummaryAnchor(null);
  };

  const handleChartSelect = (chartName) => {
    showChart(chartName);
    handleCloseCharts();
  };

  const handleEnsembleSumClick = (event) => {
    setEnsembleSummaryAnchor(event.currentTarget);
  };

  const handleCloseEnsembleSum = () => {
    setEnsembleSummaryAnchor(null);
    setTableAnchorEl(null);
  };

  const handleGinglesMenuClick = (event) => {
    setGinglesMenuAnchorEl(event.currentTarget);
  };

  const handleCloseGinglesMenu = () => {
    setGinglesMenuAnchorEl(null);
    setChartAnchorEl(null); // Close the Charts menu as well
  };

  const handleBoxWhiskersClick = (event) => {
    setboxwhiskersAnchorEl(event.currentTarget);
  };

  const handleCloseBoxWhiskers = () => {
    setboxwhiskersAnchorEl(null);
    setChartAnchorEl(null);
  };

  const handleEIClick = (event) => {
    setEIAnchorEl(event.currentTarget);
  };

  const handleCloseEI = () => {
    setEIAnchorEl(null);
    setChartAnchorEl(null);
  };

  const handleRaceClick = (event) => {
    setRaceAnchorEl(event.currentTarget);
  };

  const handleCloseRace = () => {
    setRaceAnchorEl(null);
    setChartAnchorEl(null);
  };

  const handleRaceAndCandidateSelect = (race, candidate) => {
    setSelectedRace(race);
    setSelectedCandidate(candidate);
    handleCloseRace();
    handleChartSelect(`${candidate.toLowerCase()}-ei-${race.toLowerCase()}`);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Team Knicks
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              color="inherit"
              onClick={() => {
                onHomeClick();
                handleTabClick("home");
              }}
              style={{
                backgroundColor:
                  activeTab === "home" ? "#4292e2" : "transparent",
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                onStateSelect("New York");
                handleTabClick("newYork");
              }}
              style={{
                backgroundColor:
                  activeTab === "newYork" ? "#4292e2" : "transparent",
              }}
            >
              New York
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                onStateSelect("South Carolina");
                handleTabClick("southCarolina");
              }}
              style={{
                backgroundColor:
                  activeTab === "southCarolina" ? "#4292e2" : "transparent",
              }}
            >
              South Carolina
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                displayStateSummary();
                handleTabClick("stateSummary");
              }}
              style={{
                backgroundColor:
                  activeTab === "stateSummary" ? "#4292e2" : "transparent",
              }}
            >
              State Summary
            </Button>
            <Button
              color="inherit"
              onClick={handleChartsClick}
              style={{
                backgroundColor:
                  activeTab === "charts" ? "#4292e2" : "transparent",
              }}
            >
              Charts
            </Button>
            <Button
              color="inherit"
              onClick={handleTablesClick}
              style={{
                backgroundColor:
                  activeTab === "tables" ? "#4292e2" : "transparent",
              }}
            >
              Tables
            </Button>
            <Menu
              id="tables-menu"
              anchorEl={tableAnchorEl}
              keepMounted
              open={Boolean(tableAnchorEl)}
              onClose={handleCloseTables}
            >
              <MenuItem onClick={handleEnsembleSumClick}>
                Ensemble Summary
              </MenuItem>
              <MenuItem onClick={() => handleTableSelect("state-table")}>
                State Assembly
              </MenuItem>
            </Menu>
            <Menu
              id="charts-menu"
              anchorEl={chartAnchorEl}
              keepMounted
              open={Boolean(chartAnchorEl)}
              onClose={handleCloseCharts}
            >
              <MenuItem onClick={() => handleChartSelect("assembly-bar-graph")}>
                State Assembly Distribution
              </MenuItem>
              <MenuItem onClick={handleGinglesMenuClick}>
                2/3 Gingles Analysis
              </MenuItem>
              <MenuItem onClick={handleBoxWhiskersClick}>
                Box & Whiskers
              </MenuItem>
              <MenuItem onClick={() => handleChartSelect("opportunity")}>
                Opportunity Districts
              </MenuItem>
              <MenuItem onClick={() => handleChartSelect("ei")}>
                Ecological Inference
              </MenuItem>
            </Menu>
            <Menu
              id="gingles-menu"
              anchorEl={ginglesMenuAnchorEl}
              keepMounted
              open={Boolean(ginglesMenuAnchorEl)}
              onClose={handleCloseGinglesMenu}
            >
              <MenuItem onClick={() => handleChartSelect("white-gingles")}>
                White
              </MenuItem>
              <MenuItem onClick={() => handleChartSelect("black-gingles")}>
                Black
              </MenuItem>
              <MenuItem onClick={() => handleChartSelect("hispanic-gingles")}>
                Hispanic/Latino
              </MenuItem>
              <MenuItem onClick={() => handleChartSelect("asian-gingles")}>
                Asian
              </MenuItem>
            </Menu>
            <Menu
              id="boxwhiskers-menu"
              anchorEl={boxwhiskersAnchorEl}
              keepMounted
              open={Boolean(boxwhiskersAnchorEl)}
              onClose={handleCloseBoxWhiskers}
            >
              <MenuItem onClick={() => handleChartSelect("white-boxwhiskers")}>
                White
              </MenuItem>
              <MenuItem onClick={() => handleChartSelect("black-boxwhiskers")}>
                Black
              </MenuItem>
              <MenuItem
                onClick={() => handleChartSelect("hispanic-boxwhiskers")}
              >
                Hispanic/Latino
              </MenuItem>
              <MenuItem onClick={() => handleChartSelect("asian-boxwhiskers")}>
                Asian
              </MenuItem>
            </Menu>
            <Menu
              id="ensemble-sum-menu"
              anchorEl={ensembleSummaryAnchor}
              keepMounted
              open={Boolean(ensembleSummaryAnchor)}
              onClose={handleCloseEnsembleSum}
            >
              <MenuItem onClick={() => handleTableSelect("250-ensemble-sum")}>
                250 Districts
              </MenuItem>
              <MenuItem onClick={() => handleTableSelect("5000-ensemble-sum")}>
                5000 Districts
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
