import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
