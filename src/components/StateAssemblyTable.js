import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { MdStar } from "react-icons/md";
import { FaRepublican, FaDemocrat } from "react-icons/fa";
import "../index.css";

const StateAssemblyTable = ({ selectedState, showTable, onDistrictClick }) => {
  const [assemblyData, setAssemblyData] = useState([]);
  const [assemblyDataFiltered, setAssemblyDataFiltered] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedDistrict, setClickedDistrict] = useState(null);
  const [partyFilter, setPartyFilter] = useState(null);
  const [raceFilter, setRaceFilter] = useState(null);

  const rowsPerPage = 4;

  const cellStyle = {
    padding: "8px",
    fontSize: "smaller",
  };

  useEffect(() => {
    const fetchData = async () => {
      const code = selectedState === "New York" ? "NY" : "SC";
      setStateCode(code);
      try {
        const response = await fetch(
          `http://localhost:8081/api/v2/table/${code}`
        );
        const data = await response.json();
        const sortedData = data.sort(
          (a, b) => parseInt(a.districtID) - parseInt(b.districtID)
        );
        setAssemblyData(sortedData);
        setAssemblyDataFiltered(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedState]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil(assemblyDataFiltered.length / rowsPerPage)
      )
    );
  };

  useEffect(() => {
    if (assemblyData.length === 0) return; // Don't filter if data is not loaded yet

    let filteredResult = [...assemblyData];
    if (partyFilter) {
      filteredResult = filteredResult.filter(
        (element) => element.party === partyFilter
      );
      //console.log(filteredResult);
    }
    if (raceFilter) {
      filteredResult = filteredResult.filter(
        (element) => element.race === raceFilter
      );
    }
    setAssemblyDataFiltered(filteredResult);
  }, [partyFilter, raceFilter]); // Run whenever jsonData, partyFilter, or raceFilter changes

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div className="left-col-box">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={6}
                style={{ textAlign: "center", fontSize: "smaller" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => showTable("")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Close
                </Button>{" "}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Previous
                </Button>{" "}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={endIndex >= assemblyDataFiltered.length}
                  onClick={handleNextPage}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Next
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setPartyFilter("republican")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Only Reps
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setPartyFilter("democrat")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Only Dems
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setRaceFilter("white")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Only Whites
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setRaceFilter("black")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Only Blacks
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setRaceFilter("asian")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Only Asians
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setRaceFilter("hispanic")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Only Hispanics
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ ...cellStyle, width: "15%" }}>
                District Number
              </TableCell>
              <TableCell style={{ ...cellStyle, width: "20%" }}>
                Representative Name
              </TableCell>
              <TableCell style={{ ...cellStyle, width: "15%" }}>
                Photo
              </TableCell>
              <TableCell style={{ ...cellStyle, width: "20%" }}>
                Representative Race
              </TableCell>
              <TableCell style={{ ...cellStyle, width: "15%" }}>
                Party
              </TableCell>
              <TableCell style={{ ...cellStyle, width: "15%" }}>
                Vote Margin
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assemblyDataFiltered.slice(startIndex, endIndex).map((row) => (
              <TableRow
                key={row._id}
                className={`${
                  clickedDistrict === row.districtID
                    ? "clicked-row"
                    : "hovered-row"
                }`}
                onClick={() => {
                  onDistrictClick(row.districtID);
                  setClickedDistrict(row.districtID);
                }}
              >
                <TableCell component="th" scope="row" style={cellStyle}>
                  <a
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {row.districtID}
                  </a>
                </TableCell>
                <TableCell style={cellStyle}>{row.name}</TableCell>
                <TableCell style={cellStyle}>
                  <img
                    src={`http://localhost:8081/images/${stateCode}/${row.districtID}`}
                    alt={`District ${row.districtID} Representative`}
                    style={{
                      width: "35px",
                      height: "45px",
                    }}
                  />
                </TableCell>
                <TableCell style={cellStyle}>
                  {capitalizeFirstLetter(row.race)}
                </TableCell>
                <TableCell style={cellStyle}>
                  {row.party === "republican" ? (
                    <FaRepublican style={{ color: "red" }} />
                  ) : row.party === "democrat" ? (
                    <FaDemocrat style={{ color: "blue" }} />
                  ) : (
                    <MdStar style={{ color: "grey" }} />
                  )}{" "}
                  {capitalizeFirstLetter(row.party)}
                </TableCell>
                <TableCell style={cellStyle}>
                  {Math.round(row.voteMargin) + "%"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StateAssemblyTable;
