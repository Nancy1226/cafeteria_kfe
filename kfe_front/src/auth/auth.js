import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
}

export function getDecodedToken() {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    // si exp existe, validar expiración
    if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
      clearAuth();
      return null;
    }

    return decoded;
  } catch {
    clearAuth();
    return null;
  }
}

export function isAuthenticated() {
  return !!getDecodedToken();
}

export function getRole() {
  const d = getDecodedToken();
  return d?.role ?? d?.rol ?? null;
}
