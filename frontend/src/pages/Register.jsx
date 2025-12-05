import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

const Register = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={submit}>
        <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-2 border mb-2" required />
        <input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" type="email" className="w-full p-2 border mb-2" required />
        <input value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} placeholder="Password" type="password" className="w-full p-2 border mb-4" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
