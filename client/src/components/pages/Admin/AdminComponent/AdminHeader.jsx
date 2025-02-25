import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Modal,
  Fade,
  Backdrop,
  ButtonBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutButton from "./Logout";
import AdminProfile from "./AdminProfile";
import Button from "@mui/material/Button";

const AdminHeader = ({
  toggleTheme,
  themeMode,
  isSidebarOpen,
  toggleSidebar,
  role,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  // Handle menu open/close
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Handle profile modal open/close
  const handleProfileOpen = () => {
    setOpenProfile(true);
    handleMenuClose(); 
  };
  const handleProfileClose = () => setOpenProfile(false);

  return (
    <>
      {/* AppBar (Header) */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${isSidebarOpen ? 240 : 0}px)`,
          ml: isSidebarOpen ? "240px" : "0px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Toolbar>
          {/* Sidebar Toggle Button */}
          <IconButton color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Dynamic Dashboard Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </Typography>

          {/* Dark Mode Toggle */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Profile Dropdown */}
          <Box>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>

            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileOpen}>
                <Button variant="contained" color="primary" fullWidth>
                  Profile
                </Button>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <LogoutButton />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Modal */}
      <Modal
        open={openProfile}
        onClose={handleProfileClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openProfile}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            {/* Pass handleClose to Profile */}
            <AdminProfile handleClose={handleProfileClose} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AdminHeader;
