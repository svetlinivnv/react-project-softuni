import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="hero">
      <h2>Welcome to Shopify</h2>
      <p>Discover amazing products at unbeatable prices.</p>
      <Link
        to="/catalog"
        className="btn"
      >
        Shop Now
      </Link>
    </section>
  );
}
