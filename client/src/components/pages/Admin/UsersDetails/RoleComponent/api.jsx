// import axios from "axios";

// const API_URL = "http://localhost:4000/api/v1/roles";
// const PERMISSIONS_URL = "http://localhost:4000/api/v1/permissions";

// // Get token from localStorage
// const getAuthHeaders = () => {
//     const token = localStorage.getItem("authToken");
//     return token ? { Authorization: `Bearer ${token}` } : undefined;
//   };
  
// // Fetch all roles
// export const fetchRoles = async () => {
//   const response = await axios.get(API_URL, { headers: getAuthHeaders() });
//   return response.data;
// };

// // Fetch all permissions
// export const fetchPermissions = async () => {
//   const response = await axios.get(PERMISSIONS_URL, { headers: getAuthHeaders() });
//   return response.data;

// };

// // Create a new role
// export const createRole = async (roleData) => {
//   const response = await axios.post(`${API_URL}/create`, roleData, { headers: getAuthHeaders() });
//   return response.data;
// };

// // Update a role
// export const updateRole = async (roleId, updatedRole) => {
//   const response = await axios.put(`${API_URL}/${roleId}`, updatedRole, { headers: getAuthHeaders() });
//   return response.data;
// };

// // Delete a role
// export const deleteRole = async (roleId) => {
//   const response = await axios.delete(`${API_URL}/${roleId}`, { headers: getAuthHeaders() });
//   return response.data;
// };


// export const getPermissions = async (permissionIds) => {
//     try {
//       const response = await fetch(`${PERMISSIONS_URL}?ids=${permissionIds.join(",")}`);
  
//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`);
//       }
  
//       return await response.json(); // Ensure it's parsing JSON
//     } catch (error) {
//       console.error("Failed to fetch permissions:", error);
//       return []; // Return an empty array in case of an error
//     }
//   };
 
  
  
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/roles";
const PERMISSIONS_URL = "http://localhost:4000/api/v1/permissions";

// Get token from localStorage and return headers properly
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// Fetch all roles
export const fetchRoles = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch all permissions
export const fetchPermissions = async () => {
  try {
    const response = await axios.get(PERMISSIONS_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new role
export const createRole = async (roleData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, roleData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error.response?.data || error.message);
    throw error;
  }
};

// Update a role
export const updateRole = async (roleId, updatedRole) => {
  try {
    const response = await axios.put(`${API_URL}/${roleId}`, updatedRole, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error updating role:", error.response?.data || error.message);
    throw error;
  }
};

// Delete a role
export const deleteRole = async (roleId) => {
  try {
    const response = await axios.delete(`${API_URL}/${roleId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error deleting role:", error.response?.data || error.message);
    throw error;
  }
};

// Get specific permissions by IDs
export const getPermissions = async (permissionIds) => {
  try {
    const response = await axios.get(`${PERMISSIONS_URL}?ids=${permissionIds.join(",")}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Failed to fetch permissions:", error.response?.data || error.message);
    return []; // Return an empty array in case of an error
  }
};
