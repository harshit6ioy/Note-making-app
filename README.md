# NoteNest

A full-stack note-making application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). NoteNest lets users create, view, edit, and delete notes, with options for public and private visibility. It features secure authentication and a modern, responsive UI.

---

## ✨ Features

- **CRUD Notes:** Create, view, edit, and delete notes.
- **User Authentication:** Secure registration and login with JWT.
- **Public/Private Notes:** Mark notes as public (viewable by anyone) or private (accessible only to you).
- **Responsive Design:** Optimized for desktops, tablets, and mobile.
- **RESTful API:** Efficient backend built with Express.js.
- **MongoDB Integration:** Reliable storage using MongoDB Atlas.
- **Modern UI:** Built with React.js.

---

## 📦 Dependencies

### Frontend (React App)
- `react`
- `react-dom`
- `react-router-dom`
- `axios`

### Backend (Node.js/Express App)
- `express`
- `mongoose`
- `jsonwebtoken`
- `bcrypt`
- `dotenv`
- `cors`

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (Free tier is sufficient for development)
  - [Create a MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register)
- Alternatively, you can install MongoDB locally

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/note-nest.git
cd note-nest
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_strong_random_jwt_secret_here
```

- Replace `your_mongodb_atlas_connection_string_here` with your actual MongoDB Atlas connection string.
- Replace `your_strong_random_jwt_secret_here` with a long, random, and secure string.

Start the backend server:

```bash
npm start
```

The backend API will now be running on [http://localhost:5000](http://localhost:5000).

#### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Ensure `REACT_APP_API_URL` points to the correct URL where your backend API is running.

Start the frontend development server:

```bash
npm start
```

The frontend application will typically open in your default browser at [http://localhost:3000](http://localhost:3000).

---

## 🖥️ Usage

- **Register:** Create a new user account with your email and password.
- **Login:** Log in with your credentials to access your notes dashboard.
- **Create Note:** Add new notes, providing a title, content, and selecting whether it should be public or private.
- **View Notes:** See all your notes displayed. Public notes will be distinguishable.
- **Edit Note:** Modify the title, content, or public/private status of an existing note.
- **Delete Note:** Remove unwanted notes.
- **Logout:** Securely end your session.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'feat: Add a new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.