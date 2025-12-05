import React from "react";
import clsx from "clsx";

export default function Button({ children, className, variant = "primary", ...props }) {
  const base = "px-4 py-2 rounded-md text-sm inline-flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-50 border",
    muted: "bg-gray-100 text-gray-800"
  };
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
