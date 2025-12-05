import React from "react";
import { Link } from "react-router-dom";

export default function FeatureCard({ title, children, icon, slug }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-none w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-indigo-400 text-white flex items-center justify-center text-lg font-semibold">
          {icon ?? title?.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">
            {slug ? <Link to={`/features/${slug}`} className="hover:underline">{title}</Link> : title}
          </h3>
          <div className="text-sm text-gray-600">{children}</div>
        </div>
      </div>

      {slug && (
        <div className="mt-4">
          <Link to={`/features/${slug}`} className="text-sm text-primary font-medium hover:underline">
            Learn more →
          </Link>
        </div>
      )}
    </article>
  );
}
