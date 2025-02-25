const express = require("express");
const router = express.Router();
const roleController = require("../controllers/role.controller");
const { authMiddleware, adminMiddleware } = require("../middleware/authMw");


// Create a new role
router.post("/create", authMiddleware, adminMiddleware, roleController.CreateRole);

// Get all roles
router.get("/", roleController.GetRoles);
router.get("/:roleId", roleController.GetRoleById);


// Update an existing role
router.put("/:roleId", authMiddleware, adminMiddleware, roleController.UpdateRole);

// Delete a role
router.delete("/:roleId", authMiddleware, adminMiddleware, roleController.DeleteRole);

// Assign role to user (Admin only)
router.put("/assign-role/:userId", authMiddleware, adminMiddleware, roleController.AssignRoleToUser);


module.exports = router;
