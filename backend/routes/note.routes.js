const express = require("express");
const router = express.Router();
const {
  createNote,
  getMyNotes,
  updateNote,
  deleteNote,
  getPublicNotes, 
} = require("../controllers/note.controllers");

const authMiddleware = require("../middleware/auth.middleware");


router.get("/public", getPublicNotes);


router.use(authMiddleware);

router.post("/", createNote);
router.get("/", getMyNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
