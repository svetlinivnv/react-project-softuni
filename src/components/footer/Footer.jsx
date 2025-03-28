import { useAuth } from "../../contexts/AuthContext";

export default function Footer() {
  const { loading } = useAuth();
  if (loading) {
    return null;
  }

  return (
    <footer className="footer">
      <p>&copy; 2025 Shopify. All rights reserved.</p>
    </footer>
  );
}
