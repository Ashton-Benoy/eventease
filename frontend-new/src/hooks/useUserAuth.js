export const isUserLoggedIn = () => {
  return localStorage.getItem("userAuth") === "true";
};

export const loginUser = (email) => {
  localStorage.setItem("userAuth", "true");
  localStorage.setItem("userEmail", email);
};

export const logoutUser = () => {
  localStorage.removeItem("userAuth");
  localStorage.removeItem("userEmail");
};
