const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validateRegistration, validateLogin, validatePasswordReset } = require("../middlewares/validate");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", validateRegistration, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    const existingUserWithPassword = await User.findOne();
    if (existingUserWithPassword && (await bcrypt.compare(password, existingUserWithPassword.password))) {
      return res.status(400).json({ error: "This password is already in use, please choose another one" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/forgot-password", validatePasswordReset, async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({ error: "New password cannot be the same as the old password" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("User Data Fetch Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
