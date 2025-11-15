import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const RSVPPage = () => {
  const { id } = useParams(); // event ID from URL
  const [event, setEvent] = useState(null);
  const [response, setResponse] = useState(""); // "yes" or "no"
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch event info
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setFetching(false);
      }
    };
    fetchEvent();
  }, [id]);

  const submitRSVP = async (e) => {
    e.preventDefault();

    if (!response) {
      setError("Please select Yes or No");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await API.post(`/events/${id}/rsvp`, { response });

      setSuccessMsg("RSVP submitted successfully! 🎉");

      // Optional: redirect in 2 seconds
      // setTimeout(() => window.location.href = `/events/${id}`, 2000);

    } catch (err) {
      setError("Failed to submit RSVP");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center mt-10">Loading...</p>;

  if (error && !event)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-3">
        RSVP for: <span className="text-blue-600">{event?.title}</span>
      </h2>

      <p className="text-gray-700 mb-6">{event?.description}</p>

      {/* Success */}
      {successMsg && (
        <p className="text-green-600 mb-4 font-medium">{successMsg}</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {/* RSVP Form */}
      <form onSubmit={submitRSVP}>
        <label className="block font-semibold mb-2">Will you attend?</label>

        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="response"
              value="yes"
              onChange={(e) => setResponse(e.target.value)}
            />
            Yes
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="response"
              value="no"
              onChange={(e) => setResponse(e.target.value)}
            />
            No
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
};

export default RSVPPage;
