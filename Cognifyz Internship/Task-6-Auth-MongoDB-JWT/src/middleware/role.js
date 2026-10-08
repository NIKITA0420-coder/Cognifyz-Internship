// Usage: router.get("/", authenticate, authorizeRoles("admin"), handler)
module.exports = (...roles) => (req, res, next) =>
  req.user && roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ error: "Forbidden: insufficient permissions" });
