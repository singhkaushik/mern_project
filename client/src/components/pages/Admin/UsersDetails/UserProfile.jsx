import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  FormControl,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl as MuiFormControl,
  Grid,
} from "@mui/material";
import AdminHeader from "../AdminComponent/AdminHeader";
import AdminSidebar from "../AdminComponent/AdminSidebar";

const API_URL = "http://localhost:4000/api/v1/users";
const ROLES_URL = "http://localhost:4000/api/v1/roles";

const UserProfile = ({ toggleTheme, themeMode }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <AdminHeader
        toggleTheme={toggleTheme}
        themeMode={themeMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        role="admin"
      />
      <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Container>
            <Typography variant="h4" gutterBottom>
              My Portfolio
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {user && (
              <Box component="form" onSubmit={handleUpdateProfile} sx={{ marginBottom: 4 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Name"
                        variant="outlined"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        fullWidth
                        required
                        disabled={!permissions.includes("update_name")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        fullWidth
                        required
                        disabled={!permissions.includes("update_email")}
                      />
                    </FormControl>
                  </Grid>
                  {permissions.includes("update_role") && (
                    <Grid item xs={12} sm={4}>
                      <MuiFormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={selectedRole}
                          onChange={(e) => setSelectedRole(e.target.value)}
                          label="Role"
                          required
                        >
                          {roles.map((role) => (
                            <MenuItem key={role._id} value={role._id}>
                              {role.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </MuiFormControl>
                    </Grid>
                  )}
                  {permissions.includes("update_profile") && (
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit" sx={{ width: "100%" }}>
                        Update Profile
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Container>
        </Box>
      </div>
    </>
  );
};

export default UserProfile;
