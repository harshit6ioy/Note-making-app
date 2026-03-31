import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4 animate-fade-in-down">
        Welcome to Your Note App 📝
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
        Create, manage, and share your notes securely.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200"
        >
          Signup
        </button>
        <button
          onClick={() => navigate("/public")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all duration-200"
        >
          View Public Notes 🌍
        </button>
      </div>
    </div>
  );
};

export default Home;
