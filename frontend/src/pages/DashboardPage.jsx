import Container from "../components/Container";
import Card from "../components/Card";

export default function Dashboard() {
  // sample data — replace with API calls
  const events = [
    { id: 1, title: "Company Meetup", date: "2025-12-15", guests: 54 },
    { id: 2, title: "Birthday Party", date: "2026-01-05", guests: 20 }
  ];

  return (
    <Container>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(e => (
          <Card key={e.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <p className="text-sm text-gray-500">{e.date}</p>
                <p className="mt-2 text-sm">{e.guests} guests</p>
              </div>
              <div className="text-xs text-gray-400">ID #{e.id}</div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
