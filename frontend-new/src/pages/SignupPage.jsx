import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";

export default function SignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup({ email, password });
      nav("/my-tickets");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow"
      >
        <h1 className="text-2xl font-bold mb-2">Create account</h1>
        <p className="text-gray-500 mb-6">Join EventEase</p>

        {error && (
          <div className="mb-4 text-sm text-red-600">{error}</div>
        )}

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full mb-6 px-3 py-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {loading ? "Creating…" : "Sign Up"}
        </button>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
