import React from "react";

export default function LoadingSkeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-white p-4 rounded-lg border ${className}`}>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-32 bg-gray-100 rounded"></div>
    </div>
  );
}
