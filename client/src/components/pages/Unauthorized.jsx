import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" color="error">
        Unauthorized Access
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        You are not authorized to view this page. Please login to continue.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate("/login")}
      >
        Go to Login
      </Button>
    </Container>
  );
};

export default Unauthorized;
