import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">EventEase</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
        A smart and seamless event management system where you can create, manage,
        share and participate in events easily.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Login
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-10 text-gray-500">
        Built for college event management with simplicity & speed.
      </p>
    </div>
  );
};

export default Home;
