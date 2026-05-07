import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/my-tickets");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form onSubmit={handleLogin} className="w-80 rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-xl font-bold">User Login</h2>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-3 w-full rounded border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 w-full rounded border p-2"
        />

        <button
          disabled={loading}
          className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-center text-sm">
          New user?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
