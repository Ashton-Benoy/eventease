import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-900 border-b dark:border-slate-800">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <span className="bg-indigo-600 text-white px-2 py-1 rounded">E</span>
        EventEase
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        {/* PUBLIC */}
        {!user && !admin && (
          <>
            <Link to="/events">Browse Events</Link>
            <Link to="/login">Log in</Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-1.5 rounded"
            >
              Sign up
            </Link>
          </>
        )}

        {/* USER */}
        {user && !admin && (
          <>
            <Link to="/events">Browse Events</Link>
            <Link to="/my-tickets">My Tickets</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 font-medium"
            >
              Logout
            </button>
          </>
        )}

        {/* ADMIN */}
        {admin && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/events">Manage Events</Link>
            <Link to="/admin/attendees">Attendees</Link>
            <button
              onClick={handleLogout}
              className="text-red-600 font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
