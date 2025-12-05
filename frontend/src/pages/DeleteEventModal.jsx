import React, { useEffect, useState } from "react";
import API from "../services/api";

const DeleteEventModal = ({ id, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await API.delete(`/events/${id}`);
      onDeleted(); // tell parent to refresh / navigate
      onClose();   // close modal
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  // Close modal when pressing ESC
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // click outside closes
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-80 animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h3 className="text-lg font-bold mb-3 text-center">Delete Event?</h3>
        <p className="text-gray-600 text-center mb-5">
          Are you sure you want to delete this event?
        </p>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
