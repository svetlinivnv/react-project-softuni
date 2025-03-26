import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export default function GuestGuard() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated.user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
