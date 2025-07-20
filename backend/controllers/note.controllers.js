const Note = require("../models/note.model");

// Create a new note
exports.createNote = async (req, res) => {
  const { title, content, isPublic } = req.body;
  try {
    const note = await Note.create({
      title,
      content,
      isPublic,
      userId: req.userId
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error in creating note", error: err.message });
  }
};

// Get all notes for the logged-in user
exports.getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.status(200).json({ notes });  
  } catch (err) {
    res.status(500).json({ message: "Error fetching the notes", error: err.message });
  }
};

// Update an existing note
exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, isPublic } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, content, isPublic },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Error updating the note", error: err.message });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, userId: req.userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Error deleting the note", error: err.message });
  }
};

// ✅ NEW: Get all public notes with user names
exports.getPublicNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .populate("userId", "name"); // Only fetch user's name
    res.status(200).json({ notes });
  } catch (err) {
    res.status(500).json({ message: "Error fetching public notes", error: err.message });
  }
};
