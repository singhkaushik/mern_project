const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolio.controllers");

// Routes
router.post("/create", portfolioController.createPortfolio);
router.get("/", portfolioController.getAllPortfolio);
router.put("/:id", portfolioController.updatePortfolio);

router.delete("/:id", portfolioController.deletePortfolio);

module.exports = router;
