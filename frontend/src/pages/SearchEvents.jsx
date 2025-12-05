import React, { useState } from "react";
import API from "../services/api.js";


const SearchEvents = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [organizer, setOrganizer] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchEvents = async () => {
    setLoading(true);
    try {
      const res = await API.get("/events/search", {
        params: { keyword, category, startDate, endDate, price, organizer },
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const clearFilters = () => {
    setKeyword("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setPrice("");
    setOrganizer("");
    setResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Search Events</h1>

      <div className="bg-white p-6 shadow rounded mb-6">
        <input
          type="text"
          placeholder="Search events..."
          className="w-full p-3 border rounded mb-4"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            className="border p-3 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="music">Music</option>
            <option value="workshop">Workshop</option>
            <option value="sports">Sports</option>
            <option value="party">Party</option>
          </select>

          <input
            type="date"
            className="border p-3 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className="border p-3 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Advanced filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            className="border p-3 rounded"
            placeholder="Max price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            className="border p-3 rounded"
            placeholder="Organizer name"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={searchEvents}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>

          <button
            onClick={clearFilters}
            className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center mt-4">Searching...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500 text-center">No results</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((event) => (
            <div key={event._id} className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-700">{event.location}</p>
              <p className="text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </p>

              <button
                className="mt-2 text-white bg-blue-600 px-4 py-2 rounded"
                onClick={() => (window.location.href = `/events/${event._id}`)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchEvents;
