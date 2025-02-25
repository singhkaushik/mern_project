import React, { Component } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          bgcolor="#f4f4f4"
        >
          <Card
            sx={{
              width: "90%",
              maxWidth: 400,
              textAlign: "center",
              p: 3,
              borderRadius: 2,
              boxShadow: 5,
              "&:hover": {
                boxShadow: 10,
                transform: "scale(1.02)",
                transition: "0.3s",
              },
            }}
          >
            <CardContent>
              <ErrorOutlineIcon sx={{ fontSize: 60, color: "red", mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                404 Error
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Oops! Something went wrong. Please try again later.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={this.handleReload}
              >
                Go Home
              </Button>
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
