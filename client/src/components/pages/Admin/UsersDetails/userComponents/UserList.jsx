import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Divider, Chip, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, CircularProgress } from "@mui/material";
import axiosInstance from "../../../axiosInstance";

const API_URL = "http://localhost:4000/api/v1"; // Adjust as needed

const getToken = () => localStorage.getItem("authToken");

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, rolesData] = await Promise.all([fetchUsers(), fetchRoles()]);
      console.log("Users:", usersData);  // ✅ Debugging
      console.log("Roles:", rolesData);  // ✅ Debugging
      setUsers(usersData);
      setRoles(rolesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/users`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      return [];
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/roles`, { headers: getAuthHeaders() });
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error.response?.data || error.message);
      return [];
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setOpen(true);
  };

  const handleUpdate = async () => {
    if (!editUser) return;
    try {
      await axiosInstance.put(`${API_URL}/users/${editUser._id}`, editUser, { headers: getAuthHeaders() });
      setOpen(false);
      loadData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`${API_URL}/users/${id}`, { headers: getAuthHeaders() });
      loadData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Grid container spacing={3}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <CircularProgress />
        </Box>
      ) : users.length === 0 ? (
        <Typography variant="h6">No users found</Typography>
      ) : (
        users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">{user.name}</Typography>
                <Divider sx={{ margin: "10px 0" }} />
                <Typography variant="body2" color="textSecondary">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Role:</strong> {user.role?.name || "N/A"} 
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
                  <Chip label="Edit" color="primary" onClick={() => handleEdit(user)} sx={{ margin: 1 }} />
                  <Chip label="Delete" color="error" onClick={() => handleDelete(user._id)} sx={{ margin: 1 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}

      {/* Edit User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editUser?.name || ""}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={editUser?.email || ""}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          {/* Role Dropdown */}
          <Select
            fullWidth
            value={editUser?.role?._id || ""}
            onChange={(e) => setEditUser({ ...editUser, role: roles.find((r) => r._id === e.target.value) })}
            displayEmpty
          >
            <MenuItem value="" disabled>Select Role</MenuItem>
            {roles.length > 0 ? (
              roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No roles found</MenuItem>
            )}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default UserList;
