const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Register User
const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Find role by name (convert "admin", "user", etc., into ObjectId)
    const userRole = await Role.findOne({ name: role });
    if (!userRole) {
      return res.status(400).json({ success: false, msg: "Invalid role" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and Save User
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole._id, // Store ObjectId instead of role name
    });

    await user.save();

    res
      .status(201)
      .json({ success: true, msg: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Error registering user" });
  }
};

// Login User
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).populate("role");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    // Validate Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role.name,
        email: user.email,
        name:user.name

       }, // Send role name in token
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.json({ success: true, msg: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Error logging in" });
  }
};

// Update User Profile
const updateUserProfileByRoleId = async (req, res) => {
  try {
    const { name, email } = req.body;
    const roleId = req.params.roleId;

    // Check if email exists in another account
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.role.toString() !== roleId) {
      return res.status(400).json({ message: "Email already in use by another account." });
    }

    // Update user details
    const user = await User.findOneAndUpdate(
      { role: roleId },
      { name, email },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Update failed. Try again." });
  }
};


// Get all users with their role names
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role"); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

// Get User Statistics
const getStates = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    // Fetch Role ObjectIds for "admin" and "user"
    const adminRole = await Role.findOne({ name: "admin" });
    const userRole = await Role.findOne({ name: "user" });

    if (!adminRole || !userRole) {
      console.error("Roles not found:", { adminRole, userRole }); // Debugging Log
      return res.status(500).json({ message: "Roles not found in database" });
    }

    console.log("Admin Role Found:", adminRole); // Debugging Log
    console.log("User Role Found:", userRole); // Debugging Log

    const activeUsers = await User.countDocuments({
      role: { $in: [adminRole._id, userRole._id] },
    });

    const pendingApprovals = await User.countDocuments({
      role: { $nin: [adminRole._id, userRole._id] },
    });

    res.json({ totalUsers, activeUsers, pendingApprovals });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Check if User ID exists
    if (!req.params.id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Check if the user exists
    const userExists = await User.findById(req.params.id);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent non-admins from changing roles
    if (req.user.role !== "admin" && req.body.role) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update roles" });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );

    // Check if update was successful
    if (!updatedUser) {
      return res.status(500).json({ error: "Error updating user" });
    }

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getdata = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const role1 = await Role.findById(user.role);
      if (role1) {
        res.json(role1);
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in /users/me:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
const getUserByRoleId = async (req, res) => {
  try {
    const user = await User.findOne({ role: req.params.roleId }).select("-password").populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  Register,
  Login,
  updateUserProfileByRoleId,
  getStates,
  getUsers,
  deleteUser,
  updateUser,
  getdata,
  getUserById,
  getUserByRoleId
};
