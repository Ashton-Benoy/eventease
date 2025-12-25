import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

 
    localStorage.setItem(
      "admin",
      JSON.stringify({
        email,
        role: "admin",
      })
    );

    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow w-80"
      >
        <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4 dark:bg-slate-800"
        />

        <button className="w-full bg-red-600 text-white py-2 rounded">
          Login as Admin
        </button>
      </form>
    </div>
  );
}
