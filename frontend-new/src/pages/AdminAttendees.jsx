export default function AdminAttendees() {
  return (
    <div className="p-8 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <h1 className="text-2xl font-bold mb-6">Attendees</h1>

      <div className="space-y-3">
        <div className="p-4 rounded-lg border dark:border-slate-800 bg-white dark:bg-slate-900">
          <p><strong>Name:</strong> Alice</p>
          <p><strong>Event:</strong> Tech Meetup</p>
          <p className="text-green-600">Checked In</p>
        </div>
      </div>
    </div>
  );
}
