require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);
const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const app = express();
const cors = require("cors");

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ data: "Hello World!" });
});

//create account
app.post("/create-account", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ error: true, message: "Username is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });
  if (isUser) {
    return res.json({ error: true, message: "Email already exists" });
  }
  const user = new User({
    username,
    email,
    password,
  });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration successfully",
  });
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }
  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }
  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      error: false,
      email,
      accessToken,
      message: "Login successfully",
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid credentials" });
  }
});

//get-users
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user.user._id });

  if (!isUser) {
    return res.status(404).json({ error: true, message: "User not found" });
  }

  return res.json({
    user: {
      username: isUser.username,
      email: isUser.email,
      _id: isUser._id,
      createdAt: isUser.createdAt,
    },
    message: "",
  });
});

//add note
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user.user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    console.error("Error saving note:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//edit note
app.put("/edit-note/:id", authenticateToken, async (req, res) => {
  const _id = req.params.id;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No Changes provided" });
  }

  try {
    const note = await Note.findOne({ _id, userId: user.user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (isPinned) {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//get notes
app.get("/get-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user.user._id }).sort({
      isPinned: -1,
    });

    return res.json({
      error: false,
      notes,
      message: "All Notes fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//delete note
app.delete("/delete-note/:id", authenticateToken, async (req, res) => {
  const _id = req.params.id;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id, userId: user.user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    await note.deleteOne({ _id, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//update isPinned
app.put("/update-note-pinned/:id", authenticateToken, async (req, res) => {
  const _id = req.params.id;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id, userId: user.user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//search notes
app.get("/search-notes/", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }
  try {
    const matchingNotes = await Note.find({
      userId: user.user._id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query fetched successfully",
    });

  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

app.listen(8000);

module.exports = app;
