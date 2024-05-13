// HomePage.js
import React from "react";
import { Button, Container, Typography } from "@mui/material";

const HomePage = ({ navigateToState }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ marginTop: "40px" }}>
        Welcome to the Racial/Ethnic Analysis Tool
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Select a state to get started:
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigateToState("New York")}
        sx={{ margin: 1 }}
      >
        New York
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigateToState("South Carolina")}
        sx={{ margin: 1 }}
      >
        South Carolina
      </Button>
    </Container>
  );
};

export default HomePage;
