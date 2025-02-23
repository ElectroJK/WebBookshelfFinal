const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
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

router.get("/", authenticateToken, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.userId }).sort({ updatedAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books", details: error.message });
  }
});


router.get("/search", authenticateToken, async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: "Search query is required" });
    const books = await Book.find({
      userId: req.user.userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } }
      ]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error searching books", details: error.message });
  }
});

router.get("/filter", authenticateToken, async (req, res) => {
  try {
    let { status } = req.query;
    if (!status) return res.status(400).json({ error: "Status is required" });
    status = status.trim().toLowerCase();
    const books = await Book.find({
      userId: req.user.userId,
      status: { $regex: `^${status}$`, $options: "i" }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error filtering books", details: error.message });
  }
});

router.post("/add", authenticateToken, async (req, res) => {
  try {
    let { title, author, status, rating } = req.body;
    if (!title || !author) return res.status(400).json({ error: "Title and author are required" });

    const validStatuses = ["Want to Read", "Reading", "Read"];
    if (!status) status = "Want to Read";
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status. Allowed values: Want to Read, Reading, Read" });
    }

    if (rating && (isNaN(rating) || rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Rating must be a number between 1 and 5" });
    }

    const newBook = new Book({ title, author, status, rating, userId: req.user.userId });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

router.post("/update/:id", authenticateToken, async (req, res) => {
  try {
    let { status, rating } = req.body;
    const bookId = req.params.id;
    const validStatuses = ["Want to Read", "Reading", "Read"];
    status = validStatuses.find(s => s.toLowerCase() === status?.trim().toLowerCase());
    if (!status) return res.status(400).json({ error: "Invalid status" });
    if (rating !== null && (isNaN(rating) || rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Invalid rating. It must be a number between 1 and 5." });
    }
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId, userId: req.user.userId },
      { status, rating },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ error: "Book not found" });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

router.post("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting book", details: error.message });
  }
});

module.exports = router;
