import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FaPeopleArrows, FaUser } from "react-icons/fa";
import useUserRole from "../../../config/UseUserRole";
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const AdminSidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState([]);
  

  // Fetch user role using the custom hook
  const { userRole, loading, error } = useUserRole();

  useEffect(() => {
    if (!loading && !error) {
      // Define menu items based on the role
      setMenuItems(
        userRole === "admin"
          ? [
              { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
              { text: "Users", icon: <FaUser />, path: "/admin/users" },
              { text: "Role", icon: <FaPeopleArrows />, path: "/admin/role" },
              { text: "Portfolio", icon: <ControlPointDuplicateIcon/>, path: "/users" },
            ]
          : [
              { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
              { text: "Portfolio", icon: <ControlPointDuplicateIcon/>, path: "/users" },
              { text: "Permissions", icon: <WorkspacePremiumIcon/>, path: "/permissions" },
              
            ]
      );
    }
  }, [userRole, loading, error]); // Update when role changes

  // Display loading or error messages if necessary
  if (loading) {
    return <p>Loading user role...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
      sx={{
        width: isSidebarOpen ? 240 : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          transition: "width 0.3s ease-in-out",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#f0f0f0",
                color: "black",
                fontWeight: "bold",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;
