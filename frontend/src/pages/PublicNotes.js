import React, { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const PublicNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  const fetchPublicNotes = async () => {
    try {
      const res = await API.get("/api/notes/public");
      setNotes(res.data.notes);
    } catch (err) {
      console.error("Error fetching public notes", err);
      setError("Failed to fetch public notes.");
    }
  };

  useEffect(() => {
    fetchPublicNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        🌍 Public Notes
      </h2>

      {error && (
        <p className="text-red-600 text-center font-semibold">{error}</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {notes.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300 col-span-full font-medium">
            No public notes available.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-white dark:bg-gray-800 border-2 border-gray-700 dark:border-gray-500 p-5 rounded-xl shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {note.title}
              </h3>

              <p className="text-gray-800 dark:text-gray-300 font-medium mb-2">
                {note.content}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1">
                Created by: {note.userId?.name || "Unknown"}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                Created At:{" "}
                {note.createdAt
                  ? new Date(note.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "Unknown date"}
              </p>

              {note.updatedAt && note.updatedAt !== note.createdAt && (
                <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-1">
                  Last Updated:{" "}
                  {new Date(note.updatedAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PublicNotes;