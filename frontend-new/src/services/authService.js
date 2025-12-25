

export async function login({ email, password }) {
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
