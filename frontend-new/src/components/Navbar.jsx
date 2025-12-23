import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white">
            E
          </span>
          <span>EventEase</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-medium"
                : "text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            }
          >
            Browse Events
          </NavLink>

          <NavLink
            to="/my-tickets"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-medium"
                : "text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            }
          >
            My Tickets
          </NavLink>

          <NavLink
            to="/login"
            className="text-slate-600 dark:text-slate-300 hover:text-indigo-600"
          >
            Log in
          </NavLink>

          <NavLink
            to="/signup"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Sign up
          </NavLink>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
