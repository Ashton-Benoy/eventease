import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-slate-900 shadow">
      <Link to="/" className="font-bold text-xl">EventEase</Link>

      <div className="flex gap-4 items-center">
        {admin && (
          <>
            <Link to="/admin">Admin Panel</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        )}

        {user && !admin && (
          <>
            <Link to="/events">Browse Events</Link>
            <Link to="/my-tickets">My Tickets</Link>
            <button onClick={logout} className="text-red-500">Logout</button>
          </>
        )}

        {!user && !admin && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
