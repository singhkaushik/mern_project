import axiosInstance from "../../../axiosInstance";
import axios from "axios";
import Config from "../../../../config/Config"


const API_URL = `${Config.Backend_Path}/api/v1`; 

const getToken = () => localStorage.getItem("authToken");

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/users`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchRoles = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/roles`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error.response?.data || error.message);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    console.log("Raw User Data:", user);

    const userData = { 
      ...user, 
      role: user.role._id || user.role 
    };

    console.log("User Data Sent to Backend:", userData);

    const response = await axiosInstance.post(
      `${API_URL}/users/signup`, 
      userData, 
      { headers: getAuthHeaders() }
    );

    console.log("User Created Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
    throw error;
  }
};


export const updateUser = async (id, userData, token) => {
  try {
    const response = await axios.put(
      `${Config.Backend_Path}/api/v1/users/${id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.response?.data || error);
    throw error;
  }
};




export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/users/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error deleting user:", error.response?.data || error.message);
    throw error;
  }
};
