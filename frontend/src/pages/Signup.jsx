export default function Signup() {
  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>
        <input placeholder="Name" className="w-full p-2 border mb-3" />
        <input placeholder="Email" className="w-full p-2 border mb-3" />
        <input placeholder="Password" type="password" className="w-full p-2 border mb-3" />
        <button className="w-full bg-green-600 text-white p-2 rounded">Sign Up</button>
      </div>
    </div>
  );
}
