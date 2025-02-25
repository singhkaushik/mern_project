import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { fetchPortfolio, deletePortfolio } from "./portfolioComponent/portfolioApi";
import AdminHeader from "../AdminComponent/AdminHeader";
import AdminSidebar from "../AdminComponent/AdminSidebar";
import PortfolioCard from "./portfolioComponent/PortfolioCard";
import PortfolioForm from "./portfolioComponent/PortfolioForm";
import useUserRole from "../../../config/UseUserRole";
import Config from "../../../config/Config"

const UserPortfolio = ({ toggleTheme, themeMode }) => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { userRole, loading: roleLoading, error: roleError } = useUserRole();

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    setIsLoading(true);
    try {
      const response = await fetchPortfolio();
      console.log("Fetched Portfolio Data:", response);
      setPortfolioData(response.data || []); 
    } catch (err) {
      console.error("Error fetching portfolio:", err);
      setErrorMessage(err.message);
    }
    setIsLoading(false);
  };

  const handleDelete = async (portfolioId) => {
    if (!portfolioId) {
      console.error("Error: No portfolio ID provided for deletion.");
      return;
    }

    // console.log("Deleting Portfolio ID:", portfolioId);
    try {
      await deletePortfolio(portfolioId);
      console.log(`Portfolio ID ${portfolioId} deleted successfully.`);
      loadPortfolio(); 
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
      setErrorMessage("Failed to delete portfolio. Please try again.");
    }
  };
  const updatePortfolio = async (id, updatedData) => {
    try {
      const response = await fetch(`${Config.Backend_Path}/api/v1/portfolio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) throw new Error("Failed to update portfolio");
  
      alert("Portfolio updated successfully!");
      loadPortfolio();
    } catch (error) {
      console.error("Error updating portfolio:", error);
    }
  };


  

  return (
    <>
      <AdminHeader
        toggleTheme={toggleTheme}
        themeMode={themeMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        role={userRole}
      />
      <Box sx={{ display: "flex" }}>
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <Container sx={{ flexGrow: 1, p: 5, mt: 5 }}>
          {(isLoading || roleLoading) && <CircularProgress />}
          {(errorMessage || roleError) && <Alert severity="error">{errorMessage || roleError}</Alert>}

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            User Portfolio
          </Typography>
          <Container>
          <Grid container spacing={3}>
          {portfolioData.length > 0 ? (
            portfolioData.map((portfolio) => (
              <PortfolioCard
                key={portfolio._id}
                portfolioData={portfolio}
                onEdit={() => {
                  setIsEditing(true);
                  setEditMode(true);
                  setEditData(portfolio);
                }}
                   updatePortfolio={updatePortfolio}
                onDelete={() => handleDelete(portfolio._id)}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 4,
                border: "2px dashed #ddd",
                borderRadius: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6, borderColor: "#007bff" },
              }}
            >
              <Typography variant="h6" color="primary">
                No Portfolio Found
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                Get started by creating your portfolio now.
              </Typography>
              <Fab
                color="success"
                sx={{ mt: 2 }}
                onClick={() => {
                  setIsEditing(true);
                  setEditMode(false);
                  setEditData(null);
                }}
              >
                <AddIcon />
              </Fab>
            </Box>
          )}
          </Grid>
          </Container>

          {/* Floating Create Button */}
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 20, right: 20 }}
            onClick={() => {
              setIsEditing(true);
              setEditMode(false);
              setEditData(null);
            }}
          >
            <AddIcon />
          </Fab>

          {/* Modal for Create/Update Form */}
          <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
              {editMode ? "Edit Portfolio" : "Create Portfolio"}
            </DialogTitle>
            <DialogContent>
              <PortfolioForm
                portfolioData={editData}
                setIsEditing={setIsEditing}
                refreshPortfolio={loadPortfolio}
                editMode={editMode}
              />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
              <Button onClick={() => setIsEditing(false)} color="error" variant="contained">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  );
};

export default UserPortfolio;
