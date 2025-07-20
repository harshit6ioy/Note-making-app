# 📝 Note-Making App

A simple and elegant online note-taking application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). Users can securely create, manage, and organize personal notes with optional public visibility.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login with JWT)
- 🗒️ Create, Read, Update, Delete (CRUD) Notes
- 👁️ Public/Private Notes Visibility
- 🌗 Light/Dark Mode Toggle
- 📊 Profile Dashboard with Note Statistics
- 🧠 Category Tagging for Notes
- 💡 Clean and Minimal UI

---

## 💻 Tech Stack

| Frontend  | Backend    | Database | Auth |
|-----------|------------|----------|------|
| React     | Express.js | MongoDB  | JWT  |

---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/harshit6ioy/Note-making-app.git
cd Note-making-app
Backend Setup
bash
Copy
Edit
cd backend
npm install
Create a .env file in the backend folder and add:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend:

bash
Copy
Edit
node server.js
Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
