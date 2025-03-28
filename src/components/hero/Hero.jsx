import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="hero">
      <h2>
        Welcome to <span className="logo-semicolor">SHOP</span>IFY
      </h2>
      <p>Check out our latest items below!</p>
      <Link
        to="/catalog"
        className="btn"
      >
        Shop Now
      </Link>
    </section>
  );
}
