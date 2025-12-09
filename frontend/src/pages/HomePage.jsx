import Container from "../components/Container";
import Button from "../components/Button";

export default function Home() {
  return (
    <Container>
      <div className="grid gap-8 sm:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">Manage events. Make memories.</h1>
          <p className="text-gray-600 mb-6">Create events, invite guests, and track RSVPs — all in one place.</p>
          <Button>Get Started</Button>
        </div>
        <div>
          <div className="bg-gradient-to-br from-primary to-indigo-400 rounded-lg text-white p-8">
            <h3 className="text-xl font-semibold">Live preview</h3>
            <p className="mt-2 text-sm">Responsive dashboard, RSVP flows and more.</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
