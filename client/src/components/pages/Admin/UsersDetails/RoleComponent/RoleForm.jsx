import React, { useState } from "react";
import { Grid, TextField, FormControlLabel, Checkbox, Button, Typography, Box } from "@mui/material";
import { createRole } from "./api";

const RoleForm = ({ permissions, onRoleCreated }) => {
  const [role, setRole] = useState({ name: "", permissions: [] });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setRole({ ...role, [e.target.name]: e.target.value });
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setRole((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, value] : prev.permissions.filter((id) => id !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createRole(role);
      setRole({ name: "", permissions: [] });
      onRoleCreated("Role created successfully!"); 
    } catch (err) {
      setError("Failed to create role.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6">Create Role</Typography>

      {/* ✅ Removed undefined successMessage */}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Role Name" name="name" value={role.name} onChange={handleChange} fullWidth required />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Assign Permissions</Typography>
          {permissions.map((permission) => (
            <FormControlLabel
              key={permission._id}
              control={
                <Checkbox
                  value={permission._id}
                  checked={role.permissions.includes(permission._id)}
                  onChange={handlePermissionChange}
                />
              }
              label={permission.name}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Role
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoleForm;
