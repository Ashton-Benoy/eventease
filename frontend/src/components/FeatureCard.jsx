import React from "react";

export default function FeatureCard({ title, children, icon }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-none w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-400 text-white flex items-center justify-center text-lg font-semibold">
          {icon ?? title?.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <div className="text-sm text-gray-600">{children}</div>
        </div>
      </div>
    </article>
  );
}
