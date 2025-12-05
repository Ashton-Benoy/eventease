import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50"
        aria-expanded={open}
      >
        <div className="text-left">
          <div className="text-sm font-medium">{title}</div>
        </div>
        <div className="ml-3">
          {open ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </button>

      <div className={`px-4 py-3 bg-white border-t ${open ? "block" : "hidden"}`}>
        <div className="text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
}
