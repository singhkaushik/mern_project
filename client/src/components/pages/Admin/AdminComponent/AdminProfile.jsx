import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Install using: npm install jwt-decode

const API_BASE_URL = "http://localhost:4000/api/v1/users";

const AdminProfile = ({ handleClose }) => {
  const token = localStorage.getItem("authToken");
  const decoded = token ? jwtDecode(token) : null;

  const [profile, setProfile] = useState({
    name: decoded?.name || "",
    email: decoded?.email || "",
    role: decoded?.role || "", // Read-only
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  if (!decoded) {
    return <Typography variant="h6" color="error">Unauthorized: Invalid Token</Typography>;
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/${decoded.id}`, // Update only name & email
        {
          name: profile.name,
          email: profile.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });

        // ✅ Update local state immediately
        setProfile((prev) => ({
          ...prev,
          name: profile.name,
          email: profile.email,
        }));

        // ✅ If backend returns updated token, update localStorage
        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbar({ open: true, message: "Update failed! Email may already be in use.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleUpdate}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Update Profile
      </Typography>

      <TextField fullWidth label="Name" name="name" value={profile.name} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Email" name="email" value={profile.email} onChange={handleChange} sx={{ mb: 2 }} />
      <TextField fullWidth label="Role" name="role" value={profile.role} disabled sx={{ mb: 2 }} /> {/* Read-only */}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="contained" color="primary" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Update Profile"}
        </Button>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminProfile;
