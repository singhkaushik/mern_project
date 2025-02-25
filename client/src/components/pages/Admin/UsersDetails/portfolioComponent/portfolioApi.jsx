import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/portfolio";

// Fetch all portfolio items
export const fetchPortfolio = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch portfolio data.");
  }
};

// Upload image separately
export const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.imageUrl;
  } catch (error) {
    console.error("Error uploading image:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to upload image.");
  }
};

// Save (Create or Update) Portfolio
export const savePortfolio = async (data, isEditing, portfolioId) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.imageFile instanceof File) {
      formData.append("image", data.imageFile);
    }

    const url = isEditing ? `${API_URL}/${portfolioId}` : `${API_URL}/create`;

    await axios({
      method: isEditing ? "PUT" : "POST",
      url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Portfolio saved successfully!");
  } catch (error) {
    console.error("Error saving portfolio:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to save portfolio.");
  }
};

// Delete Portfolio
export const deletePortfolio = async (portfolioId) => {
  try {
    if (!portfolioId) {
      throw new Error("Invalid portfolio ID");
    }
    console.log("Sending DELETE request for ID:", portfolioId);
    await axios.delete(`${API_URL}/${portfolioId}`);
    console.log("Delete successful!");
  } catch (error) {
    console.error("Error deleting portfolio:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete portfolio.");
  }
};
