export default function AdminEvents() {
  const events = [
    { id: 1, title: "Tech Meetup", date: "Dec 15" },
    { id: 2, title: "Design Workshop", date: "Dec 18" },
  ];

  return (
    <div className="p-8 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <div className="space-y-4">
        {events.map((e) => (
          <div
            key={e.id}
            className="flex justify-between items-center p-4 rounded-lg border dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <div>
              <h2 className="font-semibold">{e.title}</h2>
              <p className="text-sm opacity-70">{e.date}</p>
            </div>
            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
