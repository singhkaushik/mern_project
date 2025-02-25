import React, { useState } from "react";
import { Container } from "react-bootstrap";
import AdminSidebar from "../AdminComponent/AdminSidebar";
import AdminStats from "../AdminComponent/AdminStates";
import AdminHeader from "../AdminComponent/AdminHeader";
import { Outlet } from "react-router-dom";
import useUserRole from "../../../config/UseUserRole"; 

const AdminDashboard = ({ toggleTheme, themeMode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { userRole, loading, error } = useUserRole();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {loading && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Loading user role...</p>
        </div>
      )}
      {error && (
        <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
          <p>Failed to load user role: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <AdminHeader
            toggleTheme={toggleTheme}
            themeMode={themeMode}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            role={userRole}
          />

          <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
            <AdminSidebar isSidebarOpen={isSidebarOpen} />

            <Container fluid className="p-4">
              <h2 className="mb-4 mt-5">
                Welcome, {userRole === "admin" ? "Admin" : "User"}
              </h2>
              <AdminStats />
              <Outlet />
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
