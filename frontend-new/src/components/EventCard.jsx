// src/components/EventCard.jsx
import React from "react";

export default function EventCard({ id, title, date, location, description, onDetails, onBuy }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{date} • {location}</p>
          {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onDetails || (() => {})} className="px-3 py-2 rounded-md text-sm border border-gray-200 hover:bg-gray-50">Details</button>
          <button onClick={onBuy || (() => {})} className="px-3 py-2 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700">Reserve</button>
        </div>
      </div>
    </div>
  );
}
