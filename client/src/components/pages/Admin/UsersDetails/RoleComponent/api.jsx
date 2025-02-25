import axios from "axios";
import Config from "../../../../config/Config"

const API_URL = `${Config.Backend_Path}/api/v1/roles`;
const PERMISSIONS_URL = `${Config.Backend_Path}/api/v1/permissions`;

// Get token from localStorage 
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
    return []; 
  }
};
