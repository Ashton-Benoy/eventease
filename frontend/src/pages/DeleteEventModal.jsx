import React, { useState } from "react";
import API from "../api"; // axios instance

const DeleteEventModal = ({ show, onClose, eventId, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null; // Don't render if hidden

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      await API.delete(`/events/${eventId}`);

      onDeleteSuccess(); // refresh list OR redirect
      onClose(); // close modal
    } catch (err) {
      setError("Failed to delete event. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h3 className="text-xl font-semibold mb-4">Delete Event?</h3>

        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this event? This action cannot be undone.
        </p>

        {error && (
          <p className="text-red-500 mb-3 text-sm">{error}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
