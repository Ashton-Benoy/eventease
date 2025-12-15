// src/pages/EventList.jsx
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/Container";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import api from "../services/apiService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function EventList() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: api.getEvents,
  });

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set(events.map(e => e.category || "General"));
    return ["all", ...Array.from(set)];
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter(e => {
      if (category !== "all" && (e.category || "General") !== category) return false;
      if (!q) return true;
      return e.title.toLowerCase().includes(q.toLowerCase());
    });
  }, [events, q, category]);

  return (
    <Container className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 bg-white rounded-lg shadow-sm px-3 py-2">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search events" className="outline-none w-64" />
        </div>

        <div className="flex gap-2 items-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1 rounded-full text-sm ${category === cat ? "bg-indigo-600 text-white" : "bg-white border"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20">Loading events…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(ev => (
            <Link to={`/events/${ev._id}`} key={ev._id}>
              <Card className="hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">{ev.title}</h3>
                    <p className="text-sm text-gray-500">{new Date(ev.startAt).toLocaleString()}</p>
                    <div className="mt-2 text-sm text-gray-600">{ev.location || "Online"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-600 font-semibold">${((ev.tickets?.[0]?.priceCents || 0) / 100).toFixed(2)}</div>
                    <div className="text-xs text-gray-400 mt-2">{ev.tickets?.length || 0} ticket types</div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
