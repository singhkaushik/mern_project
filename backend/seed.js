const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Role = require("./models/role.model");
const Permission = require("./models/permission.model");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Sample roles and permissions data
const rolesData = [
  { name: "admin", permissions: ["Full Access", "Manage Roles", "Delete User","Editor","Read Only","Write Only","Delete"] },
  { name: "user", permissions: ["Read Only"] },
  { name: "editor", permissions: ["Write Only"] },
];

// Function to seed roles and permissions
const seedRoles = async () => {
  try {
    // Step 1: Create permissions if they don't exist
    const permissionNames = rolesData.reduce((acc, role) => {
      return [...acc, ...role.permissions];
    }, []);

    // Create unique permissions
    const uniquePermissionNames = [...new Set(permissionNames)];
    const existingPermissions = await Permission.find({ name: { $in: uniquePermissionNames } });

    const existingPermissionNames = existingPermissions.map(permission => permission.name);
    const newPermissions = uniquePermissionNames.filter(name => !existingPermissionNames.includes(name));

    // Insert new permissions if any
    for (let name of newPermissions) {
      const permission = new Permission({ name, description: `Description for ${name}` });
      await permission.save();
    }

    // Step 2: Create roles and associate permissions
    await Role.deleteMany({}); // Clear any existing roles
    for (let roleData of rolesData) {
      // Get permission documents from the database
      const rolePermissions = await Permission.find({ name: { $in: roleData.permissions } });

      // Create a role with references to permissions
      const role = new Role({
        name: roleData.name,
        permissions: rolePermissions.map(permission => permission._id),
      });
      await role.save();
    }

    console.log("Roles and Permissions Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding roles and permissions:", error);
    process.exit(1);
  }
};

seedRoles();
