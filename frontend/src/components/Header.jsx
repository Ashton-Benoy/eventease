// src/components/Header.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [open, setOpen] = useState(false);
  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        (isActive ? "text-indigo-600 font-semibold" : "text-gray-700") +
        " px-3 py-2 rounded-md text-sm"
      }
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-400 text-white flex items-center justify-center font-bold">E</div>
            <div className="hidden sm:block">
              <div className="text-lg font-extrabold">EventEase</div>
              <div className="text-xs text-gray-500">Plan • Sell • Manage</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/events">Events</NavItem>
            <NavItem to="/features">Features</NavItem>
            <NavItem to="/checkin">Check-in</NavItem>
            <NavItem to="/dashboard">Dashboard</NavItem>
            <Link to="/signin" className="ml-3 inline-flex items-center px-3 py-2 border rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700">
              Sign in
            </Link>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setOpen((s) => !s)} aria-label="Toggle menu" className="p-2 rounded-md inline-flex items-center justify-center text-gray-600">
              {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link to="/events" className="block text-gray-700" onClick={() => setOpen(false)}>Events</Link>
            <Link to="/features" className="block text-gray-700" onClick={() => setOpen(false)}>Features</Link>
            <Link to="/checkin" className="block text-gray-700" onClick={() => setOpen(false)}>Check-in</Link>
            <Link to="/dashboard" className="block text-gray-700" onClick={() => setOpen(false)}>Dashboard</Link>
          </div>
        </div>
      )}
    </header>
  );
}
