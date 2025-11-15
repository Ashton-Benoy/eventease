import { useState } from 'react';
import API from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
const [form, setForm] = useState({ name: '', email: '', password: '' });
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');


const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};
const Register = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      nav("/"); // redirect home
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div> ... your UI ... </div>
  );
};


const handleRegister = async (e) => {
e.preventDefault();
setLoading(true);
setMessage('');
try {
const res = await API.post('/auth/register', form);
// backend might return { message, user }
setMessage(res.data.message || 'Registered successfully. Please login');
setTimeout(() => {
window.location.href = '/login';
}, 1200);
} catch (err) {
setMessage(err.response?.data?.message || 'Registration failed');
} finally {
setLoading(false);
}
};


return (
<div className="h-screen flex items-center justify-center bg-gray-100">
<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
<h2 className="text-2xl font-bold mb-4 text-center">Create account</h2>


<form onSubmit={handleRegister} className="flex flex-col gap-3">
<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="Full name"
className="border p-2 rounded"
required
/>


<input
name="email"
value={form.email}
onChange={handleChange}
placeholder="Email"
type="email"
className="border p-2 rounded"
required
/>


<input
name="password"
value={form.password}
onChange={handleChange}
placeholder="Password"
type="password"
className="border p-2 rounded"
required
/>


<button
type="submit"
className="w-full bg-green-600 text-white p-2 rounded disabled:opacity-50"
disabled={loading}
>
{loading ? 'Creating account...' : 'Sign up'}
</button>
</form>


{message && <p className="text-center mt-4 text-sm text-red-600">{message}</p>}


<p className="text-center text-sm mt-4">
Already have an account? <a href="/login" className="text-blue-600">Login</a>
</p>
</div>
</div>
);
}
