const Role = require("../models/role.model");
const Permission = require("../models/permission.model");

// Create a new permission
const CreatePermission = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      return res.status(400).json({ message: "Permission already exists" });
    }

    const newPermission = new Permission({
      name,
      description,
    });

    await newPermission.save();
    res.status(201).json({ message: "Permission created successfully", permission: newPermission });
  } catch (err) {
    res.status(500).json({ message: "Failed to create permission", error: err.message });
  }
};

// Get all permissions
const GetPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch permissions", error: err.message });
  }
};


// Get permissions by role ID
const GetPermissionsByRole = async (req, res) => {
  const { roleId } = req.params;

  try {
    const role = await Role.findById(roleId).populate("permissions");

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ role: role.name, permissions: role.permissions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch permissions", error: err.message });
  }
};

// Get permissions by role name
const GetPermissionsByRoleName = async (req, res) => {
  const { roleName } = req.params;

  try {
    const role = await Role.findOne({ name: roleName }).populate("permissions");

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ role: role.name, permissions: role.permissions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch permissions", error: err.message });
  }
};





module.exports = {
  CreatePermission,
  GetPermissions,
  GetPermissionsByRole,
  GetPermissionsByRoleName
};
