import React from "react";

export default function FeatureSection({ heading, items = [], children }) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      {children ?? (
        <ul className="space-y-2 pl-5 list-disc text-gray-700">
          {items.map((it, i) => (
            <li key={i} className="text-sm">{it}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
