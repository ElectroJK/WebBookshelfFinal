const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Access Denied" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid Token" });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.email === "admin@imadmin.com") {
    return next();
  }
  return res.status(403).json({ error: "Access Denied. Admins only." });
};

module.exports = { authenticateToken, isAdmin };
