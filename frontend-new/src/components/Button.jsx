
export default function Button({ children, variant = "solid", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition";
  const styles =
    variant === "solid"
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
