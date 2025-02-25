import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 

const useUserRole = () => {
  const [userRole, setUserRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No token found");

        // Decode the token to get role directly
        const decoded = jwtDecode(token);
        if (!decoded.role) throw new Error("Role not found in token");
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { userRole, loading, error };
};

export default useUserRole;
