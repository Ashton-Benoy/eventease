import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-2 border mb-2" required />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border mb-4" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
