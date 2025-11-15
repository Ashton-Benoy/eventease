import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await login(email, password);

    if (response.success) {
      setMessage("Login successful! Redirecting...");
      window.location.href = "/"; // go to home OR dashboard
    } else {
      setMessage(response.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 shadow-xl rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {message && (
        <p className="text-center mb-4 text-red-600 font-semibold">{message}</p>
      )}

      <form onSubmit={handleLogin}>
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          className="w-full p-3 border rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
