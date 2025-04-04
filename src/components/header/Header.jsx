import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

export default function Header() {
  const { user, loading, profile } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const navRef = useRef(null);
  const menuBtnRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !menuBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div
        ref={menuBtnRef}
        className="menu-toggle"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav
        ref={navRef}
        className={menuOpen ? "active" : ""}
      >
        <ul
          className="nav-links"
          onClick={closeMenu}
        >
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
                {user?.displayName && ` (${profile.displayName})`}
              </li>
              <li style={{ position: "relative" }}>
                {cart.length > 0 && (
                  <span className="cart-count">{cart.length}</span>
                )}
                <Link
                  to="/cart"
                  className="cart"
                >
                  <i
                    className="fas fa-shopping-cart"
                    style={{ opacity: 0.5 }}
                  ></i>
                  {" Cart"}
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
