import axios from "axios";
import Config from "../config/Config"

const axiosInstance = axios.create({
  baseURL: `${Config.Backend_Path}/api/v1`,
});

// Add an interceptor to check for unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
