// src/pages/FeatureDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import features from "../data/features.json";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";

export default function FeatureDetail() {
  const { slug } = useParams();
  const feature = features.find(f => f.slug === slug);

  if (!feature) {
    return (
      <Container>
        <div className="max-w-xl mx-auto text-center py-20">
          <h2 className="text-xl font-semibold">Feature not found</h2>
          <p className="mt-2 text-gray-600">Try browsing other features.</p>
          <div className="mt-4">
            <Link to="/features" className="text-primary hover:underline">Back to features</Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        <Card>
          <h1 className="text-2xl font-bold mb-2">{feature.title}</h1>
          <p className="text-gray-600 mb-4">{feature.details}</p>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {feature.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          <div className="mt-6 flex gap-3">
            <Button onClick={() => alert("Request demo — placeholder")}>Request demo</Button>
            <Link to="/contact" className="inline-flex items-center px-4 py-2 rounded-md text-sm border border-gray-200">Contact Sales</Link>
          </div>
        </Card>
      </div>
    </Container>
  );
}
