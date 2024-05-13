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
import NYEnsembleData from "./ensemble_results_NY_5000.json";
import SCEnsembleData from "./ensemble_results_SC_5000.json";

const EnsembleSum5000 = ({ selectedState, showTable }) => {
  const [ensembleData, setEnsembleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedState === "New York") {
        setEnsembleData(NYEnsembleData);
      } else {
        setEnsembleData(SCEnsembleData);
      }
    };

    fetchData();
  }, [selectedState]);

  const cellStyle = {
    padding: "8px",
    fontSize: "smaller",
  };

  return (
    <div className="left-col-box">
      <TableContainer
        component={Paper}
        style={{ maxHeight: "60vh", overflow: "auto" }}
      >
        <Table stickyHeader aria-label="district info table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => showTable("")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  <b>Close</b>
                </Button>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ensembleData &&
              Object.keys(ensembleData).map((key) => (
                <TableRow key={key}>
                  <TableCell style={cellStyle}>
                    <b>
                      {key
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </b>
                  </TableCell>
                  <TableCell style={cellStyle}>
                    {typeof ensembleData[key] === "object" ? (
                      <>
                        {Object.entries(ensembleData[key]).map(
                          ([innerKey, innerValue]) => (
                            <div key={innerKey}>
                              {innerKey === "population_equality_threshold"
                                ? "Threshold"
                                : "Threshold " + innerKey}{" "}
                              :{" "}
                              {innerValue === "number_of_districts"
                                ? "# of Districts"
                                : "# of Districts " + innerValue}
                            </div>
                          )
                        )}
                      </>
                    ) : (
                      ensembleData[key]
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EnsembleSum5000;
