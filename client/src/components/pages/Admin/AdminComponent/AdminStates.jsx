import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode properly
import Config from "../../../config/Config";

const API_URL = Config.Backend_Path;

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingApprovals: 0,
    userRole: "User",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        // Decode JWT to get user role if available
        const decoded = jwtDecode(token);
        const userRole = decoded?.role || "User";

        // Fetch all users
        const { data: users } = await axios.get(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Users:", users);

        setStats({
          totalUsers: users.length,
          activeUsers: users.filter((user) => user.isActive).length,
          pendingApprovals: users.filter((user) => user.status === "pending").length,
          userRole, // Set role from token
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.response?.data?.message || "Failed to load statistics. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-stats-container">
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p>Loading statistics...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="mt-3">{error}</Alert>
      ) : (
        <Row className="mt-4">
          {[
            { title: "Total Users", value: stats.totalUsers, color: "primary" },
            { title: "Active Users", value: stats.activeUsers, color: "success" },
            { title: "Pending Approvals", value: stats.pendingApprovals, color: "warning" },
          ].map(({ title, value, color }, index) => (
            <Col md={4} key={index} className="mb-3">
              <Card className={`border-${color} shadow-sm text-center p-3`}>
                <Card.Body>
                  <h5 className={`text-${color}`}>{title}</h5>
                  <h3 className="fw-bold">{value}</h3>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default AdminStats;
