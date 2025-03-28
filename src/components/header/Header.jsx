import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../loader/Loader";

export default function Header() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <header className="header">
      <Link
        className="logo"
        to="/"
      >
        <h1 className="logo">
          <span className="logo-semicolor">SHOP</span>IFY
        </h1>
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          {user ? (
            <div id="user">
              <li>
                <Link to="/create">Add product</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
                {` (${user.displayName})`}
              </li>
              <li>
                <Link
                  to="/cart"
                  className="cart"
                >
                  🛒 Cart
                </Link>
              </li>
            </div>
          ) : (
            <div id="guest">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}
