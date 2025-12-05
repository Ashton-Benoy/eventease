import React from "react";
export default function Input({ label, id, ...props }) {
  return (
    <label className="block">
      {label && <div className="text-sm mb-1 text-gray-700">{label}</div>}
      <input id={id} className="w-full p-2 border rounded-md text-sm" {...props} />
    </label>
  );
}
