const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permission.controlles");

// Permission Management Routes

// Create a new permission
router.post("/create", permissionController.CreatePermission);

// Get all permissions
router.get("/", permissionController.GetPermissions);
router.get("/:id", permissionController.GetPermissionsByRole);
router.get("/name/:roleName", permissionController.GetPermissionsByRoleName);

module.exports = router;
