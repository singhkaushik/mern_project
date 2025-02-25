const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controlles"); // Fixed typo
const { authMiddleware, adminMiddleware } = require("../middleware/authMw");

// User Authentication Routes

// User sign-up
router.post("/signup", userController.Register);

// User sign-in
router.post("/signin", userController.Login);

// Get all users (Admin only)
router.get("/", authMiddleware, userController.getUsers);

// Update user profile (Authenticated users)
// router.put("/:id", authMiddleware, userController.updateUserProfile);
router.get("/:id", userController.getdata)
router.get("/me", userController.getdata)

// Admin-only: Update user details
router.put("/:id", authMiddleware, adminMiddleware, userController.updateUser);

// Delete user (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);

// Get User Statistics
router.get("/stats", userController.getStates);
router.get("/role/:roleId", authMiddleware, userController.getUserByRoleId);

// Update User Profile (Only Name & Email)
router.put("/role/:roleId", authMiddleware, userController.updateUserProfileByRoleId);

module.exports = router;
