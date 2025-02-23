require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const { authenticateToken, isAdmin } = require("./middlewares/authMiddleware");


const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "login")));
app.use(express.static(path.join(__dirname, "admin")));

const User = require("./models/User");

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const adminRoutes = require("./routes/admin");

app.use("/auth", authRoutes);
app.use("/books", authenticateToken, bookRoutes);
app.use("/admin", authenticateToken, isAdmin, adminRoutes);

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    if (email === "admin@imadmin.com" && password === "admin123321") {
      return res.json({ token, redirect: "/admin.html" });
    }

    res.json({ token, redirect: "/index.html" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", authenticateToken, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
