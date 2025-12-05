import API from "./api";


export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    return { message: "Login failed" };
  }
};

export const registerUser = async (data) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (err) {
    return { message: "Registration failed" };
  }
};
