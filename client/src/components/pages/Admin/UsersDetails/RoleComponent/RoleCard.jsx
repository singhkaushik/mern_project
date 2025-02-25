import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  TextField,
  Switch,
} from "@mui/material";
import { deleteRole, updateRole, fetchRoles, fetchPermissions } from "./api"; // Ensure correct import

const RoleCard = ({ role, setRoles, setSuccessMessage }) => {
  const [open, setOpen] = useState(false);
  const [allPermissions, setAllPermissions] = useState([]); // Store all permissions
  const [editedRole, setEditedRole] = useState({
    name: role.name,
    permissions: role.permissions,
    isActive: role.isActive, // Track role activation status
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all permission names for display
  useEffect(() => {
    const getAllPermissions = async () => {
      try {
        const response = await fetchPermissions();
        setAllPermissions(response);
      } catch (err) {
        setError("Failed to load permissions.");
      }
    };
    getAllPermissions();
  }, []);

  // Handle Role Deletion
  const handleDelete = async () => {
    try {
      await deleteRole(role._id);
      setRoles((prev) => prev.filter((r) => r._id !== role._id));
      setSuccessMessage("Role deleted successfully!");
    } catch {
      setSuccessMessage("Failed to delete role.");
    }
  };

  // Handle Role Update
  const handleUpdate = async () => {
    setLoading(true);
    setError(""); // Clear previous error

    try {
      const updatedRoleData = {
        ...editedRole,
        status: editedRole.isActive ? "ok" : "pending", 
      };

      const updatedRole = await updateRole(role._id, updatedRoleData);

      if (!updatedRole || updatedRole.error) {
        throw new Error("Unexpected response from server.");
      }

      const updatedRoles = await fetchRoles();
      setRoles(updatedRoles);
      setSuccessMessage("Role updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Update failed:", error.message || error);
      setError("Failed to update role.");
    } finally {
      setLoading(false);
    }
  };

  // Handle permission selection via checkboxes
  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setEditedRole((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, value]
        : prev.permissions.filter((id) => id !== value),
    }));
  };

  // Handle Active/Inactive Toggle
  const handleStatusChange = (e) => {
    setEditedRole((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  return (
    <Card elevation={3}>
      <CardContent>
        {/* Role Name */}
        <Typography variant="h6">{role.name}</Typography>
        <Divider sx={{ margin: "10px 0" }} />

        {/* Assigned Permissions */}
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {allPermissions
            .filter((perm) => role.permissions.includes(perm._id))
            .map((perm) => (
              <Chip key={perm._id} label={perm.name} sx={{ margin: "4px" }} />
            ))}
        </Box>

        {/* Role Status */}
        <Typography variant="body2" sx={{ marginTop: 1, fontWeight: "bold" }}>
          Status: {role.isActive ? "Active" : "Pending"}
        </Typography>

        {/* Buttons for Edit & Delete */}
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </CardContent>

      {/* Edit Role Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Role Name"
            fullWidth
            value={editedRole.name}
            onChange={(e) =>
              setEditedRole({ ...editedRole, name: e.target.value })
            }
            sx={{ marginBottom: 2 }}
          />

          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
            Permissions:
          </Typography>
          {allPermissions.length === 0 ? (
            <CircularProgress size={24} />
          ) : (
            allPermissions.map((perm) => (
              <FormControlLabel
                key={perm._id}
                control={
                  <Checkbox
                    value={perm._id}
                    checked={editedRole.permissions.includes(perm._id)}
                    onChange={handlePermissionChange}
                  />
                }
                label={perm.name}
              />
            ))
          )}

          {/* Active/Inactive Toggle */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1">Status:</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={editedRole.isActive}
                  onChange={handleStatusChange}
                  color="primary"
                />
              }
              label={editedRole.isActive ? "Active (OK)" : "Pending"}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default RoleCard;
