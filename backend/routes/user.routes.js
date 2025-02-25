const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controlles"); 
const { authMiddleware, adminMiddleware } = require("../middleware/authMw");


router.post("/signup", userController.Register);

router.post("/signin", userController.Login);

router.get("/", authMiddleware, userController.getUsers);

// router.put("/:id", authMiddleware, userController.updateUserProfile);
router.get("/:id", userController.getdata)
router.get("/me", userController.getdata)

router.put("/:id", authMiddleware, adminMiddleware, userController.updateUser);

router.delete("/:id", authMiddleware, adminMiddleware, userController.deleteUser);

router.get("/stats", userController.getStates);
router.get("/role/:roleId", authMiddleware, userController.getUserByRoleId);

router.put("/role/:roleId", authMiddleware, userController.updateUserProfileByRoleId);

module.exports = router;
