import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, eventId: id }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      navigate(`/tickets/success/${data.ticket.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Buy Ticket</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={submit}
        className="w-full bg-indigo-600 text-white p-2 rounded"
      >
        Confirm Ticket
      </button>
    </div>
  );
}
