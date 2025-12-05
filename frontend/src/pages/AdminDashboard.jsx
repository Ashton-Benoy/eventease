import React, { useEffect, useState } from "react";
import API from "../services/api.js";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        const res = await API.get("/admin/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    get();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin - Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id} className="p-2 border mb-2">
            {u.name} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
