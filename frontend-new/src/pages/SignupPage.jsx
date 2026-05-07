import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/authService";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup({ name, email, password });
      navigate("/my-tickets");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-2 text-2xl font-bold">Create account</h1>
        <p className="mb-6 text-gray-500">Register before buying tickets.</p>

        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <label className="mb-2 block text-sm font-medium">Name</label>
        <input
          className="mb-4 w-full rounded border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mb-2 block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mb-4 w-full rounded border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mb-2 block text-sm font-medium">Password</label>
        <input
          type="password"
          className="mb-6 w-full rounded border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
