import React, { useState, useEffect } from "react";
import { Container, Box, Alert, CircularProgress } from "@mui/material";
import { fetchUsers, fetchRoles, deleteUser } from "./userComponents/UserApi";
import AdminHeader from "../AdminComponent/AdminHeader";
import AdminSidebar from "../AdminComponent/AdminSidebar";
import UserForm from "./userComponents/UserForm";
import UserList from "./userComponents/UserList";
import useUserRole from "../../../config/UseUserRole";

const UserDetails = ({ toggleTheme, themeMode }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [dataLoading, setDataLoading] = useState(true); // Renamed to avoid conflict
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { userRole, loading: userRoleLoading, error: userRoleError } = useUserRole();

  const loadData = async () => {
    try {
      setDataLoading(true);
      const usersData = await fetchUsers();
      const rolesData = await fetchRoles();
      setUsers(usersData);
      setRoles(rolesData);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(`Failed to load data: ${error.response?.data?.message || error.message}`);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    loadData(); // Fetch users and roles when component mounts
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setSuccessMessage("User deleted successfully.");
      loadData();
    } catch (error) {
      setErrorMessage(`Failed to delete user: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <>
      <AdminHeader
        toggleTheme={toggleTheme}
        themeMode={themeMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        role={userRole} // ✅ Corrected
      />
      <Box sx={{ display: "flex" }}>
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <Container sx={{ flexGrow: 1, p: 5, mt: 5 }}>
          {(dataLoading || userRoleLoading) && <CircularProgress />}
          {(errorMessage || userRoleError) && <Alert severity="error">{errorMessage || userRoleError}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <UserForm userToEdit={selectedUser} onUserCreatedOrUpdated={loadData} />

          <h2>User List</h2>
          {users.length > 0 ? (
            <UserList users={users} roles={roles} onEditUser={setSelectedUser} onDeleteUser={handleDeleteUser} />
          ) : (
            <p>No users found.</p>
          )}
        </Container>
      </Box>
    </>
  );
};

export default UserDetails;
