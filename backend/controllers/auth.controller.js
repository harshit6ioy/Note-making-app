const User = require("../models/user.model");
const Note = require("../models/note.model");
const bcrypt = require("bcryptjs");

// ------------------ Signup ------------------
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = user.generateToken();
    return res.status(201).json({ token, userId: user._id, name: user.name });
  } catch (err) {
    return res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// ------------------ Login ------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = user.generateToken();
    return res.status(200).json({ token, userId: user._id, name: user.name });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ------------------ Get Profile Details ------------------
const getProfileDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

// ------------------ Update Email ------------------
const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByIdAndUpdate(req.userId, { email }, { new: true });
    res.json({ message: "Email updated", email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Failed to update email", error: err.message });
  }
};

// ------------------ Update Password ------------------
const updatePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.userId, { password: hashedPassword });
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password", error: err.message });
  }
};

// ------------------ Get Note Stats (FIXED) ------------------
const getNoteStats = async (req, res) => {
  try {
    const userId = req.userId;

    // ✅ Corrected: use 'userId' field as per note.model.js
    const totalNotes = await Note.countDocuments({ userId });
    const publicNotes = await Note.countDocuments({ userId, isPublic: true });
    const privateNotes = totalNotes - publicNotes;

    res.json({ totalNotes, publicNotes, privateNotes });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

module.exports = {
  signup,
  login,
  getProfileDetails,
  updateEmail,
  updatePassword,
  getNoteStats,
};
