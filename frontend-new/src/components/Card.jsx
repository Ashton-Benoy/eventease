// src/components/Card.jsx
export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-sm rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}
