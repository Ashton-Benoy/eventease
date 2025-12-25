export default function AdminTickets() {
  return (
    <div className="p-8 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <h1 className="text-2xl font-bold mb-6">Sold Tickets</h1>

      <table className="w-full border dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg overflow-hidden">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Event</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t dark:border-slate-800">
            <td className="p-3">John Doe</td>
            <td className="p-3">Tech Meetup</td>
            <td className="p-3 text-green-600">Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
