# 📝 Note-Making App

A full-featured **MERN Stack** application that allows users to securely create, update, organize, and share personal or public notes with categories, dark mode, and profile stats.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Signup/Login)
- 🗒️ Full CRUD for Notes
- 🌍 Public/Private Notes
- 🌗 Light/Dark Mode Toggle
- 🧠 Categorized Notes
- 👤 Profile Page with Note Stats
- 🎨 Tailwind CSS UI (Minimal + Responsive)

---

## 💻 Tech Stack

| Layer     | Technologies Used                                      |
|-----------|--------------------------------------------------------|
| Frontend  | React, Axios, React Router DOM, **TailwindCSS**, Headless UI |
| Backend   | Node.js, Express.js, Mongoose, Bcrypt, JWT, Validator |
| Database  | MongoDB                                                |

---

## 📦 Installation Instructions

> ⚠️ Prerequisites: Node.js, MongoDB, Git

---

### 🔧 1. Clone the Repository


git clone https://github.com/harshit6ioy/Note-making-app.git
cd Note-making-app
🛠 2. Backend Setup (/backend)
cd backend
npm install
✅ Installs:
npm install express mongoose dotenv cors bcrypt jsonwebtoken validator
Optional extras:

npm install nodemon morgan cookie-parser
🧾 Create .env in /backend:
env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
🚀 Run the backend server:
node server.js
# or with auto-reload:
npx nodemon server.js
💻 3. Frontend Setup (/frontend)
cd ../frontend
npm install
✅ Core Dependencies:
npm install axios react-router-dom
🎨 TailwindCSS Setup (if not already set up)
If Tailwind isn’t yet installed, run:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Then update your tailwind.config.js:

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Update src/index.css (or App.css) with:

@tailwind base;
@tailwind components;
@tailwind utilities;
🌟 Optional UI Enhancements
npm install @headlessui/react @heroicons/react
⚙️ Start the React App
npm start
🌐 Local URLs
Service	URL
Frontend	http://localhost:3000
Backend	http://localhost:5000

📁 Folder Structure
pgsql
Note-making-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js, index.js
│   └── public/
└── README.md
📸 Screenshots (Add Later)
markdown
![Login](screenshots/login.png)
![Notes Dashboard](screenshots/dashboard.png)

👨‍💻 Author
Made with ❤️ by @harshit6ioy

---

