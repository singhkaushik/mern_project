import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Box,
  InputLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { createUser, updateUser, fetchRoles } from "./UserApi";

const UserForm = ({ userToEdit, onUserCreatedOrUpdated }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchRoles()
      .then((data) => {
        console.log("Roles fetched from backend:", data);
        setRoles(data);
      })
      .catch((err) => console.error("Error fetching roles:", err));
  }, []);

  useEffect(() => {
    if (userToEdit) {
      setUser({
        name: userToEdit.name || "",
        email: userToEdit.email || "",
        role: userToEdit.role || "",
        password: "",
      });
    } else {
      setUser({ name: "", email: "", role: "", password: "" });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, role: e.target.value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!user.name.trim()) errors.name = "Name is required.";
    if (!user.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email))
      errors.email = "Valid email is required.";
    if (!user.role) errors.role = "Role selection is required.";
    if (!userToEdit && !user.password.trim())
      errors.password = "Password is required.";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    console.log("User Data Being Sent:", user);

    try {
      if (userToEdit) {
        await updateUser(userToEdit._id, {
          name: user.name,
          email: user.email,
          role: user.role,
        });
        setSnackbar({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });
      } else {
        await createUser({
          name: user.name,
          email: user.email,
          role: user.role,
          password: user.password,
        });
        setSnackbar({
          open: true,
          message: "User created successfully!",
          severity: "success",
        });
      }

      onUserCreatedOrUpdated();
      setUser({ name: "", email: "", role: "", password: "" });
    } catch (error) {
      console.error(
        "Error creating/updating user:",
        error.response?.data || error
      );
      setSnackbar({
        open: true,
        message:
          "Error: " + (error.response?.data?.msg || "Something went wrong!"),
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
            required
            error={!!error.name}
            helperText={error.name}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
            required
            error={!!error.email}
            helperText={error.email}
          />
        </Grid>

        {!userToEdit && (
          <Grid item xs={12} sm={4}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              fullWidth
              required
              error={!!error.password}
              helperText={error.password}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required error={!!error.role}>
            <InputLabel>Role</InputLabel>
            <Select name="role" value={user.role} onChange={handleRoleChange}>
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role._id} value={role._id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : userToEdit ? (
              "Update User"
            ) : (
              "Create User"
            )}
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default UserForm;
