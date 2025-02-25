const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("Missing SECRET_KEY in environment variables.");
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(req.user.id).populate("role");
    if (!user || !user.role || user.role.name !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admins only." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      const user = await User.findById(req.user.id).populate("roles");
      if (!user || !user.roles) {
        return res.status(403).json({ message: "Access Denied" });
      }

      const userPermissions = user.roles.flatMap((role) => role.permissions);
      if (!userPermissions.includes(permission)) {
        return res.status(403).json({ message: "You do not have permission to perform this action" });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
};


 const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};


module.exports = {
  authMiddleware,
  adminMiddleware,
  checkPermission,
  authenticateUser
};
