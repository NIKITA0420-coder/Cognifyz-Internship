const router = require("express").Router();
const User = require("../models/User");
const authenticate = require("../middleware/auth");
const authorizeRoles = require("../middleware/role");

// Admin only: list all users (passwords excluded)
router.get("/", authenticate, authorizeRoles("admin"), async (req, res) => {
  res.json(await User.find().select("-password").sort({ createdAt: -1 }));
});

module.exports = router;
