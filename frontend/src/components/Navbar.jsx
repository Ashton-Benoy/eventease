import { Link } from "react-router-dom";


export default function Navbar() {
return (
<nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
<h2 className="text-2xl font-bold text-blue-600">EventEase</h2>


<div className="flex items-center gap-6">
<Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
Home
</Link>
<Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
Login
</Link>
<Link
to="/register"
className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
>
Register
</Link>
</div>
</nav>
);
}
<Link to="/search" className="hover:text-blue-600">
  Search
</Link>
