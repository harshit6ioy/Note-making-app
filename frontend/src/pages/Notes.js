import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    isPublic: false,
  });
  const [editNote, setEditNote] = useState(null);
  const [searchTerm] = useState("");
  const [filterPublicOnly] = useState(false);
  const [filterDate] = useState("");
  const [sortOrder] = useState("newest");

  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.notes);
    } catch (err) {
      console.error("Error fetching notes", err);
      setError("Failed to fetch notes.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditClick = (note) => {
    setEditNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      isPublic: note.isPublic,
    });
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (editNote) {
        await API.put(`/api/notes/${editNote._id}`, newNote, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post("/api/notes", newNote, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setNewNote({ title: "", content: "", isPublic: false });
      setEditNote(null);
      fetchNotes();
    } catch (err) {
      console.error("Error creating/updating note", err);
      setError(editNote ? "Failed to update note." : "Failed to create note.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note", err);
      setError("Failed to delete note.");
    }
  };

  const filteredNotes = notes
    .filter((note) => {
      const matchSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPublic = filterPublicOnly ? note.isPublic : true;

      const matchDate = filterDate
        ? new Date(note.createdAt).toLocaleDateString("en-CA") <= filterDate
        : true;

      return matchSearch && matchPublic && matchDate;
    })
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 className="text-xl font-bold">
          Hey, <span className="font-bold">{userName || "User"}</span> 👋
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/profile")}
            className="px-3 py-1 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 transition"
          >
            👤 Profile
          </button>
          <button
            onClick={() => navigate("/public")}
            className="px-3 py-1 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition"
          >
            Public Notes
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">My Notes</h2>

      {error && (
        <p className="text-red-500 text-center font-semibold mb-4">{error}</p>
      )}

      <form
        onSubmit={handleCreateNote}
        className="mb-6 space-y-4 max-w-xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-6 rounded-xl shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newNote.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newNote.content}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold"
          required
        />
        <div className="flex items-center space-x-2">
          <label className="font-semibold">Public:</label>
          <input
            type="checkbox"
            name="isPublic"
            checked={newNote.isPublic}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {editNote ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl border-2 border-gray-700 dark:border-gray-600 shadow-md hover:shadow-xl transition relative"
          >
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p className="mt-2 font-semibold">{note.content}</p>
            <span className="text-sm font-semibold mt-1 block">
              {note.isPublic ? "Public" : "Private"}
            </span>

            <button
              onClick={() => handleDelete(note._id)}
              className="absolute top-2 right-2 text-red-500 font-bold"
            >
              Delete
            </button>

            <button
              onClick={() => handleEditClick(note)}
              className="absolute top-2 right-14 text-blue-500 font-bold"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;