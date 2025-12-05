import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-indigo-400 flex items-center justify-center text-white font-bold">E</div>
          <div className="text-lg font-semibold">EventEase</div>
        </Link>

        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({isActive}) => (isActive ? "text-primary font-medium" : "text-gray-600")}>Home</NavLink>
          <NavLink to="/dashboard" className={({isActive}) => (isActive ? "text-primary font-medium" : "text-gray-600")}>Dashboard</NavLink>
          <NavLink to="/rsvp/1" className="text-gray-600">RSVP</NavLink>
          <NavLink to="/features" className={({isActive}) => isActive ? "text-primary font-medium" : "text-gray-600"}>Features</NavLink>
        </nav>
      </div>
    </header>
  );
}
