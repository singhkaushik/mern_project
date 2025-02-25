require("dotenv").config();
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const mongoose=require("mongoose"); 
const portfolioModel = require("../models/portfolio.model");

const createPortfolio = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "../../public/uploads"); 
    form.keepExtensions = true; 

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ success: false, message: "File upload error" });
      }

      const photo = files.image?.[0] || files.image;
      if (!photo) {
        return res.status(400).json({ success: false, message: "Image file is required" });
      }

      // Ensure upload directory exists
      const uploadDir = path.join(__dirname, "../../public/uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const originalFileName = photo.originalFilename.replace(/\s+/g, "_");
      const newPath = path.join(uploadDir, originalFileName);

      // Move file from temp directory
      fs.rename(photo.filepath, newPath, (err) => {
        if (err) {
          console.error("File Move Error:", err);
          return res.status(500).json({ success: false, message: "File upload failed" });
        }
      });

      // Save portfolio data
      const newPortfolio = new portfolioModel({
        title: fields.title?.[0] || fields.title,
        description: fields.description?.[0] || fields.description,
        image: originalFileName,
      });

      const savedPortfolio = await newPortfolio.save();
      return res.status(201).json({
        success: true,
        message: "Portfolio created successfully",
        data: savedPortfolio,
      });
    });
  } catch (err) {
    console.error("Create Portfolio Error:", err);
    res.status(500).json({ success: false, message: "Portfolio Creation Failed" });
  }
};


const getAllPortfolio = async (req, res) => {
  try {
    const portfolios = await portfolioModel.find();
    if (!portfolios.length) {
      return res.status(404).json({ success: false, message: "No portfolio found" });
    }
    res.status(200).json({ success: true, message: "Portfolios retrieved successfully", data: portfolios });
  } catch (err) {
    console.error("Fetch Portfolios Error:", err);
    res.status(500).json({ success: false, message: "Failed to get portfolios" });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await portfolioModel.findById(id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "../../public/uploads");
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ success: false, message: "Form parsing error" });
      }

      if (files.image) {
        const photo = files.image?.[0] || files.image;
        const originalFileName = photo.originalFilename.replace(/\s+/g, "_");
        const newPath = path.join(__dirname, "../../public/uploads", originalFileName);

        // Delete old image if it exists
        if (portfolio.image) {
          const oldImagePath = path.join(__dirname, "../../public/uploads", portfolio.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        // Move new image
        fs.rename(photo.filepath, newPath, (err) => {
          if (err) {
            console.error("File Move Error:", err);
            return res.status(500).json({ success: false, message: "File upload failed" });
          }
        });

        portfolio.image = originalFileName;
      }

      Object.keys(fields).forEach((field) => {
        portfolio[field] = fields[field]?.[0] || fields[field];
      });

      await portfolio.save();
      res.status(200).json({ success: true, message: "Portfolio updated successfully", data: portfolio });
    });
  } catch (err) {
    console.error("Update Portfolio Error:", err);
    res.status(500).json({ success: false, message: "Portfolio update failed" });
  }
};

const deletePortfolio= async (req, res) => {

    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid Portfolio ID" });
      }
  
      const result = await portfolioModel.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
  
      res.json({ message: "Portfolio deleted successfully" });
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      res.status(500).json({ message: "Error deleting portfolio" });
    }
  }
  

module.exports = {
  createPortfolio,
  getAllPortfolio,
  updatePortfolio,
  deletePortfolio
};
