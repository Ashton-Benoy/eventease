export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6 bg-slate-100 dark:bg-slate-950 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <ul className="space-y-2">
        <li>✅ Manage Events</li>
        <li>✅ View Attendees</li>
        <li>✅ Scan Tickets</li>
        <li>✅ Delete Events</li>
      </ul>
    </div>
  );
}
