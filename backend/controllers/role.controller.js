const asyncHandler = require("express-async-handler"); // Optional, use npm install express-async-handler
const Role = require("../models/role.model");
const User = require("../models/user.model");

// ✅ Create a new role
const CreateRole = asyncHandler(async (req, res) => {
  const { name, permissions } = req.body;

  const existingRole = await Role.findOne({ name });
  if (existingRole) {
    return res.status(400).json({ message: "Role already exists" });
  }

  const newRole = new Role({ name, permissions });
  await newRole.save();

  res.status(201).json({ message: "Role created successfully", role: newRole });
});

// ✅ Update an existing role
const UpdateRole = asyncHandler(async (req, res) => {
  const { roleId } = req.params;
  const { name, permissions } = req.body;

  const role = await Role.findByIdAndUpdate(
    roleId,
    { name, permissions },
    { new: true }
  );

  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  res.status(200).json({ message: "Role updated successfully", role });
});

// ✅ Delete a role
const DeleteRole = asyncHandler(async (req, res) => {
  const { roleId } = req.params;

  const role = await Role.findByIdAndDelete(roleId);
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  res.status(200).json({ message: "Role deleted successfully" });
});

// ✅ Get all roles (Ensures unique _id values)
const GetRoles = asyncHandler(async (req, res) => {
  const roles = await Role.aggregate([
    { $group: { _id: "$_id", role: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$role" } }
  ]);

  res.status(200).json(roles);
});

// ✅ Assign role to user (Admin only)
const AssignRoleToUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { roleId } = req.body;

  const [user, role] = await Promise.all([
    User.findById(userId),
    Role.findById(roleId),
  ]);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  user.role = roleId;
  await user.save();

  res.status(200).json({ message: "Role assigned to user", user });
});
// ✅ Get a single role by ID
const GetRoleById = asyncHandler(async (req, res) => {
  const { roleId } = req.params;

  const role = await Role.findById(roleId);
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  res.status(200).json(role);
});

module.exports = {
  CreateRole,
  UpdateRole,
  DeleteRole,
  GetRoles,
  AssignRoleToUser,
  GetRoleById
};
