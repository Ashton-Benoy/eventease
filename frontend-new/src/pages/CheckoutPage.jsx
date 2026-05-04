import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");

    if (!name || !email) {
      setError("Please enter name and email.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, eventId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Could not create ticket.");
        return;
      }

      localStorage.setItem("ticket", JSON.stringify(data.ticket));
      localStorage.setItem("userEmail", email);

      navigate(`/tickets/success/${data.ticket.id}`);
    } catch {
      setError("Could not connect to backend.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Buy Ticket</h1>
        <p className="mt-1 mb-5 text-sm text-slate-600">
          Enter your details to book this event.
        </p>

        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          className="mb-3 w-full rounded border p-2"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mb-3 w-full rounded border p-2"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <button
          type="button"
          onClick={submit}
          className="w-full rounded bg-indigo-600 p-2 font-medium text-white hover:bg-indigo-700"
        >
          Confirm Ticket
        </button>
      </div>
    </div>
  );
}
