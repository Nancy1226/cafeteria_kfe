import { Navigate, Outlet } from "react-router-dom";
import { getDecodedToken, getRole } from "../auth/auth.js";

export default function RoleRoute({ allowedRoles = [] }) {
  const decoded = getDecodedToken();

  // 1no autenticado
  if (!decoded) return <Navigate to="/" replace />;

  const role = getRole();

  // 2no tiene rol permitido
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/no-autorizado" replace />;
  }

  // todo bien
  return <Outlet />;
}
