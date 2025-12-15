/*import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default {
  login: async (payload) => (await API.post("/auth/login", payload)).data,
  register: async (payload) => (await API.post("/auth/register", payload)).data,
};
*/

// TEMP mock auth — replace with real backend later

export async function login({ email, password }) {
  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  // fake delay
  await new Promise(r => setTimeout(r, 600));

  localStorage.setItem(
    "user",
    JSON.stringify({ email })
  );

  return { email };
}

export async function signup({ email, password }) {
  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  await new Promise(r => setTimeout(r, 600));

  localStorage.setItem(
    "user",
    JSON.stringify({ email })
  );

  return { email };
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
