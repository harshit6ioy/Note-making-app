const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");
const userRoutes = require("./routes/user.routes"); 

// Route registration
app.use("/api/auth", authRoutes);        // Login / Signup
app.use("/api/notes", noteRoutes);       // Notes CRUD with token
app.use("/api/user", userRoutes);        

// Database and Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });
