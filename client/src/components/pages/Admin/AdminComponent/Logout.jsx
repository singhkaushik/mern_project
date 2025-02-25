import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="mt-4 text-center">
      <Button variant="danger" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </Button>
    </div>
  );
};

export default LogoutButton;
