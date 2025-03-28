import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../loader/Loader";

export default function AuthGuard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
