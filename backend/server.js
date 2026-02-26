const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// ✅ Correct Port Handling for Render
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local development
      "https://your-vercel-app-name.vercel.app" // replace after deploy
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");
const userRoutes = require("./routes/user.routes");

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

// Database and Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err.message);
  });