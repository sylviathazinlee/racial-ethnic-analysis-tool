import React, { useEffect, useState } from "react";
import nyImage from "../BoxWhiskers/NY5000BANDW_BLACK.png";
import scImage from "../BoxWhiskers/SC5000BANDW_BLACK.png";
import { Button } from "@mui/material";

const BlackBoxWhiskers = ({ selectedState, showChart }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (selectedState === "New York") {
      setImage(nyImage);
    } else {
      setImage(scImage);
    }
  }, [selectedState]);

  return (
    <div
      className="images"
      style={{
        backgroundColor: "#fff",
        height: "100%",
        marginBottom: "20px",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => showChart("")}
        style={{ fontSize: "smaller", padding: "3px 8px" }}
      >
        Close
      </Button>{" "}
      <div>
        <img
          src={image}
          style={{ width: "100%", borderRadius: "5px" }}
          alt={
            selectedState === "New York"
              ? "New York Image"
              : "South Carolina Image"
          }
        />
      </div>
    </div>
  );
};

export default BlackBoxWhiskers;
