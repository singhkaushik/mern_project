require("dotenv").config();
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const portfolioModel = require("../models/portfolio.model");
const express = require("express");


const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve images statically
const router = express.Router();
router.use("/uploads", express.static(uploadDir));

// Create Portfolio
const createPortfolio = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.multiples = false; 

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ success: false, message: "File upload error" });
      }

      const photo = files.image?.filepath ? files.image : null;
      if (!photo) {
        return res.status(400).json({ success: false, message: "Image file is required" });
      }

      const originalFileName = path.basename(photo.originalFilename).replace(/\s+/g, "_");
      const newPath = path.join(uploadDir, originalFileName);

      try {
        await fs.promises.rename(photo.filepath, newPath); 
      } catch (fileError) {
        console.error("File Move Error:", fileError);
        return res.status(500).json({ success: false, message: "File move failed" });
      }

      // Save portfolio data
      const newPortfolio = new portfolioModel({
        title: fields.title || "",
        description: fields.description || "",
        image: `https://mern-project-h3ks.onrender.com/uploads/${originalFileName}`, 
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

const updatePortfolio = async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await portfolioModel.findById(id);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.multiples = false;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ success: false, message: "Form parsing error" });
      }

      if (files.image?.filepath) {
        const photo = files.image;
        const originalFileName = path.basename(photo.originalFilename).replace(/\s+/g, "_");
        const newPath = path.join(uploadDir, originalFileName);

        // Delete old image
        if (portfolio.image) {
          const oldImagePath = path.join(uploadDir, path.basename(portfolio.image));
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        try {
          await fs.promises.rename(photo.filepath, newPath);
          portfolio.image = `https://mern-project-h3ks.onrender.com/uploads/${originalFileName}`;
        } catch (fileError) {
          console.error("File Move Error:", fileError);
          return res.status(500).json({ success: false, message: "File move failed" });
        }
      }

      // Update portfolio fields
      Object.keys(fields).forEach((field) => {
        portfolio[field] = fields[field];
      });

      await portfolio.save();
      return res.status(200).json({ success: true, message: "Portfolio updated successfully", data: portfolio });
    });
  } catch (err) {
    console.error("Update Portfolio Error:", err);
    res.status(500).json({ success: false, message: "Portfolio update failed" });
  }
};

// Get All Portfolios
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

// Delete Portfolio
const deletePortfolio = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Portfolio ID" });
    }

    const portfolio = await portfolioModel.findById(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Delete Image from Server
    if (portfolio.image) {
      const imagePath = path.join(uploadDir, path.basename(portfolio.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await portfolioModel.findByIdAndDelete(id);
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    res.status(500).json({ message: "Error deleting portfolio" });
  }
};

module.exports = {
  createPortfolio,
  getAllPortfolio,
  updatePortfolio,
  deletePortfolio,
};
