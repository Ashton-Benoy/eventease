import Container from "../components/Container";
import Input from "../components/Input";
import Button from "../components/Button";

export default function RegisterPage() {
  return (
    <Container className="py-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      <Input label="Name" />
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />

      <Button className="w-full mt-4">Create Account</Button>
    </Container>
  );
}
