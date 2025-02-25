import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});

// Add an interceptor to check for unauthorized responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, remove it and redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
