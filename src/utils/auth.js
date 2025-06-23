export const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null; // o {} o lo que uses para indicar "no hay usuario"
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export function isAuthenticated() {
  return !!getUser();
}

export function isAdmin() {
  const user = getUser();
  return user?.rol === "admin";
}

export function logout() {
  localStorage.removeItem("user");
}
export const setUser = (user) => {
  console.log("Seteo de usuario", user);
  localStorage.setItem("user", JSON.stringify(user));
};
export const setToken = (token) => {
  localStorage.setItem("token", token);
};
export const getToken = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user?.token;
  } catch {
    return null;
  }
};
