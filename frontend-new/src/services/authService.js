const API_URL = import.meta.env.VITE_API_URL;

export async function login({ email, password }) {
  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  localStorage.setItem("userEmail", data.user.email);

  return data.user;
}

export async function signup({ name, email, password }) {
  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }

  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  localStorage.setItem("userEmail", data.user.email);

  return data.user;
}

export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
}

export function getCurrentUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
