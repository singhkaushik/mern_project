import * as React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import MessageSnackbar from "../../../../../basic utility component/snackbar/MessageSnackbar";
import Config from "../../../../config/Config";

const portfolioSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup.mixed().required("Image is required"),
  link: yup.string().url("Invalid URL"),
});

export default function PortfolioForm({ initialValues = {}, onSubmit, onCancel }) {
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(initialValues.image || null);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const fileInputRef = React.useRef(null);

  // Formik Initialization
  const formik = useFormik({
    initialValues: {
      title: initialValues.title || "",
      description: initialValues.description || "",
      image: initialValues.image || "",
      link: initialValues.link || "",
    },
    validationSchema: portfolioSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!file && !values.image) {
        setMessage("Please upload an image.");
        setMessageType("error");
        return;
      }

      const fd = new FormData();
      if (file) {
        fd.append("image", file);
      }
      fd.append("title", values.title);
      fd.append("description", values.description);
      fd.append("link", values.link);

      console.log("FormData Entries:", [...fd.entries()]);

      try {
        let response;
        if (initialValues._id) {
          response = await axios.put(
            `${Config.Backend_Path}/api/v1/portfolio/${initialValues._id}`,
            fd,
            { withCredentials: true } 
          );
          setMessage("Portfolio updated successfully!");
        } else {
          response = await axios.post(
            `${Config.Backend_Path}/api/v1/portfolio/create`,
            fd,
            { withCredentials: true } 
          );
          setMessage("Portfolio created successfully!");
        }

        setMessageType("success");
        resetForm();
        handleClearFile();
        onSubmit();
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong!");
        setMessageType("error");
      }
    },
  });

  const addImage = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
      formik.setFieldValue("image", selectedFile); 
    }
  };

  // Clear File Input
  const handleClearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    setImageUrl(null);
  };

  // Close Snackbar Message
  const handleMessageClose = () => {
    setMessage("");
  };

  return (
    <Box>
      <MessageSnackbar
        open={Boolean(message)}
        message={message}
        messageType={messageType}
        handleClose={handleMessageClose}
      />

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2, fontWeight: "bold", color: "#333" }}>
          {initialValues._id ? "Edit Portfolio" : "Create Portfolio"}
        </Typography>

        {/* ✅ Updated File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={addImage}
          style={{ marginBottom: "10px" }}
        />

        {imageUrl && (
          <CardMedia
            component="img"
            image={imageUrl}
            height="200px"
            sx={{ borderRadius: "10px", mb: 2 }}
          />
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <Typography color="error">{formik.errors.title}</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <Typography color="error">{formik.errors.description}</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              name="link"
              label="Portfolio Link"
              {...formik.getFieldProps("link")}
            />
            {formik.touched.link && formik.errors.link && (
              <Typography color="error">{formik.errors.link}</Typography>
            )}
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" sx={{ mt: 3, p: 1.5, fontSize: "16px" }}>
          {initialValues._id ? "Update" : "Submit"}
        </Button>
        <Button onClick={onCancel} variant="text" sx={{ mt: 2 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
