import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fontsource/roboto";
import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Home from "./components/Home/Home";
import About from "./components/pages/About/About";
import Services from "./components/pages/Services/Services";
import Portfolio from "./components/pages/Portfolio/Portfolio";
import Contact from "./components/pages/Contact/Contact";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import AdminDashboard from "./components/pages/Admin/Dashboard/AdminDashboard";
import UserDetails from "./components/pages/Admin/UsersDetails/UserDetails";
import UserProfile from "./components/pages/Admin/UsersDetails/UserProfile";
import RoleDetails from "./components/pages/Admin/UsersDetails/RoleDetails";
import ErrorBoundary from "./components/pages/ErrorBoundary";
import UserPortfolio from "./components/pages/Admin/UsersDetails/UserPortfolio";
import Unauthorized from "./components/pages/Unauthorized"
import PrivateRoute from "./components/pages/PrivateRoute";

function App() {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Toggle theme function
  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route
                path="/dashboard"
                element={
                  <AdminDashboard
                    toggleTheme={toggleTheme}
                    themeMode={themeMode}
                  />
                }
              />
              <Route
                path="/admin/users"
                element={
                  <UserDetails
                    toggleTheme={toggleTheme}
                    themeMode={themeMode}
                  />
                }
              />
              <Route
                path="/admin/role"
                element={
                  <RoleDetails
                    toggleTheme={toggleTheme}
                    themeMode={themeMode}
                  />
                }
              />
              <Route
                path="/users"
                element={
                  <UserPortfolio
                    toggleTheme={toggleTheme}
                    themeMode={themeMode}
                  />
                }
              />
              <Route
                path="/permissions"
                element={
                  <UserProfile
                    toggleTheme={toggleTheme}
                    themeMode={themeMode}
                  />
                }
              />
            </Route>

            {/* Default Route */}
            <Route path="*" element={<Unauthorized />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
