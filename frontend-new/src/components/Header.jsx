import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

export default function Header() {
  const user = getCurrentUser();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-indigo-600 text-lg">
          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white">
            E
          </span>
          EventEase
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link
            to="/events"
            className="text-gray-600 hover:text-gray-900"
          >
            Browse Events
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Log in
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/my-tickets"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                My Tickets
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
