import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import authService from "../../services/authService";

export default function Logout() {
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await authService.logoutUser();
        setHasLoggedOut(true);
      } catch (err) {
        alert("Logout failed: ", err.message);
      }
    };
    handleLogout();
  }, []);

  return hasLoggedOut ? <Navigate to="/" /> : null;
}
