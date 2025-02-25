import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Box, Alert } from "@mui/material";
import AdminHeader from "../AdminComponent/AdminHeader";
import AdminSidebar from "../AdminComponent/AdminSidebar";
import RoleForm from "./RoleComponent/RoleForm";
import RoleList from "./RoleComponent/RoleList";
import { fetchRoles, fetchPermissions } from "./RoleComponent/api";
import useUserRole from "../../../config/UseUserRole";

const RoleDetails = ({ toggleTheme, themeMode }) => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [dataLoading, setDataLoading] = useState(false); // Renamed to avoid conflict
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { userRole, loading: userRoleLoading, error: userRoleError } = useUserRole();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const fetchedRoles = await fetchRoles();
        const uniqueRoles = Array.from(new Map(fetchedRoles.map((role) => [role._id, role])).values());
        setRoles(uniqueRoles);
        setPermissions(await fetchPermissions());
      } catch (error) {
        setErrorMessage("Failed to load data.");
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  const refreshRoles = async (message = "") => {
    try {
      const updatedRoles = await fetchRoles();
      if (updatedRoles) setRoles(updatedRoles);
      if (message) {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch {
      setErrorMessage("Failed to refresh roles.");
    }
  };

  return (
    <>
      <AdminHeader
        toggleTheme={toggleTheme}
        themeMode={themeMode}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        role={userRole} // ✅ Corrected
      />
      <Box sx={{ display: "flex" }}>
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <Container sx={{ flexGrow: 1, p: 5, mt: 5 }}>
          {dataLoading || userRoleLoading ? (
            <CircularProgress />
          ) : errorMessage || userRoleError ? (
            <Alert severity="error">{errorMessage || userRoleError}</Alert>
          ) : null}

          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <RoleForm permissions={permissions} onRoleCreated={(msg) => refreshRoles(msg)} />
          <RoleList roles={roles} setRoles={setRoles} setSuccessMessage={setSuccessMessage} />
        </Container>
      </Box>
    </>
  );
};

export default RoleDetails;
