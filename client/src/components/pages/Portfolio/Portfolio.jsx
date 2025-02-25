import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion"; // For smooth animations
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/portfolio";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data.data);
      setError("");
    } catch (err) {
      setError("Failed to load projects");
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  const getImageUrl = (image) => {
    return image ? `/images/${image}` : "/default-placeholder.png"; // Ensure correct image path
  };

  return (
    <Container sx={{ py: 5, minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#1976D2",
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Our Projects
      </Typography>

      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 3 }} />}

      <Grid container spacing={3} justifyContent="center">
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card
                sx={{
                  maxWidth: 400,
                  boxShadow: 5,
                  borderRadius: 4,
                  overflow: "hidden",
                  transition: "0.3s",
                  backgroundColor: "#fff",
                  "&:hover": { boxShadow: 8 },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={getImageUrl(project.image)}
                  alt={project.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    href={project.link}
                    target="_blank"
                    startIcon={<VisibilityIcon />}
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: 2,
                      px: 3,
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar for errors */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Portfolio;
