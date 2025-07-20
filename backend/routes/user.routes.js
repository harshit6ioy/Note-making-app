const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const {
  getProfileDetails,
  updateEmail,
  updatePassword,
  getNoteStats,
} = require("../controllers/auth.controller"); // Using existing controller

router.get("/profile", authMiddleware, getProfileDetails);
router.put("/update-email", authMiddleware, updateEmail);
router.put("/update-password", authMiddleware, updatePassword);


router.get("/stats", authMiddleware, getNoteStats);

module.exports = router;
