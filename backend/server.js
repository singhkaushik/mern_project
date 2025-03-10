require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const path = require("path");


const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(helmet());  // Security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["https://rolebaac.netlify.app"]; 

  // app.use(
  //   cors({
  //     origin: allowedOrigins,
  //     methods: ["GET", "POST", "PUT", "DELETE"],
  //     allowedHeaders: ["Content-Type", "Authorization"],
  //     credentials: true,
  //   })
  // );
  app.use(cors({
    origin: "https://rolebaac.netlify.app", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
  }));
  
  // Allow CORS for static files
  app.use("https://mern-project-h3ks.onrender.com/uploads", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  // app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  




// Routes
app.use("/api/v1/roles", require("./routes/role.routes"));
app.use("/api/v1/permissions", require("./routes/permission.routes"));
app.use("/api/v1/users", require("./routes/user.routes"));
app.use("/api/v1/portfolio", require("./routes/portfolio.routes"));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, msg: err.message || "Server Error" });
});

// Start Server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
