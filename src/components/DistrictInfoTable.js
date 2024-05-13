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
import NYEnsembleData from "../components/EnsembleSummary/NYEnsembleData.json";

const DistrictInfoTable = ({ selectedState, showTable }) => {
  const [ensembleData, setEnsembleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedState === "New York") {
        setEnsembleData(NYEnsembleData);
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
              <TableHead>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => showTable("")}
                  style={{ fontSize: "smaller", padding: "3px 8px" }}
                >
                  Close
                </Button>{" "}
              </TableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {ensembleData &&
              Object.keys(ensembleData).map((key) => (
                <TableRow key={key}>
                  <TableCell style={cellStyle}>
                    {key.replace(/_/g, " ")}
                  </TableCell>
                  <TableCell style={cellStyle}>
                    {typeof ensembleData[key] === "object"
                      ? JSON.stringify(ensembleData[key])
                      : ensembleData[key]}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DistrictInfoTable;
