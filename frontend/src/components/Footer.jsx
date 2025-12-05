import React from "react";
export default function Footer(){
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex justify-between">
        <div>© {new Date().getFullYear()} EventEase</div>
        <div>Built with ❤️ — <a className="text-indigo-600" href="https://github.com/Ashton-Benoy/eventease">GitHub</a></div>
      </div>
    </footer>
  );
}
