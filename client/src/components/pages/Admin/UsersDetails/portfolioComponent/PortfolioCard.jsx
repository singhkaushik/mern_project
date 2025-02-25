import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PortfolioForm from "./PortfolioForm";

const PortfolioCard = ({ portfolioData, onDelete, updatePortfolio }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  if (!portfolioData) return null;

  const handleDelete = () => {
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    setOpenConfirm(false);
    onDelete(portfolioData._id);
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          p: 2,
          borderRadius: 3,
          boxShadow: 4,
          transition: "0.3s",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            boxShadow: 8,
            transform: "scale(1.02)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 1, color: "#2c3e50", textAlign: "center" }}
          >
            {portfolioData.title || "Untitled"}
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 2, textAlign: "center" }}>
            {portfolioData.description || "No description available"}
          </Typography>

          {portfolioData.image ? (
            <Box
              component="img"
              src={`/uploads/${portfolioData.image}`}
              alt="Portfolio"
              sx={{
                width: "100%",
                maxHeight: 180,
                objectFit: "cover",
                borderRadius: 2,
                display: "block",
                mx: "auto",
                mt: 1,
                boxShadow: 3,
                border: "2px solid #ddd",
              }}
            />
          ) : (
            <Typography
              color="textSecondary"
              sx={{
                mt: 2,
                textAlign: "center",
                fontStyle: "italic",
                fontSize: "0.9rem",
              }}
            >
              No image available
            </Typography>
          )}
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              textTransform: "none",
              px: 2,
              fontSize: "0.85rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              },
            }}
            onClick={handleEdit}
          >
            Edit
          </Button>

          <IconButton
            color="error"
            onClick={handleDelete}
            sx={{
              border: "1px solid red",
              borderRadius: 2,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#e74c3c",
          }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button onClick={() => setOpenConfirm(false)} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Portfolio Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <PortfolioForm
          initialValues={portfolioData}
          onSubmit={(updatedData) => {
            updatePortfolio(portfolioData._id, updatedData);
            setOpenEdit(false);
          }}
          onCancel={() => setOpenEdit(false)}
        />
      </Dialog>
    </Grid>
  );
};

export default PortfolioCard;
