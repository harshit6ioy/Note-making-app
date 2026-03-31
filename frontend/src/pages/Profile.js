import React, { useState, useEffect } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stats, setStats] = useState({
    totalNotes: 0,
    publicNotes: 0,
    privateNotes: 0,
  });

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setNewEmail(res.data.email);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/api/user/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleEmailUpdate = async () => {
    try {
      const res = await API.put(
        "/api/user/update-email",
        { email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchProfile();
    } catch (err) {
      alert("Failed to update email");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const res = await API.put(
        "/api/user/update-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setNewPassword("");
    } catch (err) {
      alert("Failed to update password");
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-500 dark:border-gray-600 shadow-xl transition-all">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
          👤 Profile
        </h2>

        <p className="mb-4 text-sm font-semibold">
          <span className="block">
            <strong>Name:</strong> {profile.name}
          </span>
          <span className="block">
            <strong>Email:</strong> {profile.email}
          </span>
        </p>

        {/* Email Update */}
        <div className="mb-6">
          <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">
            Update Email
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleEmailUpdate}
            className="mt-3 w-full bg-blue-600 text-white font-bold py-2 rounded-lg transition-all transform hover:scale-105 hover:bg-blue-700 duration-200 shadow hover:shadow-lg"
          >
            Update Email
          </button>
        </div>

        {/* Password Update */}
        <div className="mb-6">
          <label className="block font-bold mb-1 text-gray-800 dark:text-gray-200">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-500 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
          />
          <button
            onClick={handlePasswordUpdate}
            className="mt-3 w-full bg-green-600 text-white font-bold py-2 rounded-lg transition-all transform hover:scale-105 hover:bg-green-700 duration-200 shadow hover:shadow-lg"
          >
            Update Password
          </button>
        </div>

        {/* Note Stats */}
        <div className="mt-6 text-sm font-semibold">
          <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-2">
            📝 Your Notes Summary
          </h3>
          <p>Total Notes: {stats.totalNotes}</p>
          <p>Public Notes: {stats.publicNotes}</p>
          <p>Private Notes: {stats.privateNotes}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;