import { useEffect, useState } from "react";

export default function AdminUsers() {
  const API_URL = import.meta.env.VITE_API_URL;
  const adminToken = localStorage.getItem("adminToken");
  const [users, setUsers] = useState([]);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    const res = await fetch(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeStatus = async (user, isActive) => {
    setMessage("");

    if (!isActive && !reason) {
      setMessage("Please write a reason before deactivating a user.");
      return;
    }

    await fetch(`${API_URL}/api/users/${user.id || user._id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ isActive, inactiveReason: reason }),
    });

    setReason("");
    loadUsers();
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-1 text-slate-600">
          View active and inactive users. Deactivate users with a reason.
        </p>

        <div className="mt-6 rounded-lg bg-white p-5 shadow">
          <label className="mb-2 block text-sm font-medium">
            Reason for deactivation
          </label>
          <input
            className="w-full rounded border p-2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Example: Policy violation"
          />
          {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id || user._id} className="border-t">
                  <td className="p-3">{user.name || "User"}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    {user.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="p-3">{user.inactiveReason || "-"}</td>
                  <td className="p-3">
                    {user.isActive ? (
                      <button
                        onClick={() => changeStatus(user, false)}
                        className="rounded bg-red-600 px-3 py-1 text-white"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => changeStatus(user, true)}
                        className="rounded bg-green-600 px-3 py-1 text-white"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
