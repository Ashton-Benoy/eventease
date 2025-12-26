import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

  
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        role: "user",
      })
    );

    navigate("/my-tickets");
    localStorage.setItem("userEmail", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow w-80"
      >
        <h2 className="text-xl font-bold text-center mb-4">User Login</h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3 dark:bg-slate-800"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4 dark:bg-slate-800"
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
