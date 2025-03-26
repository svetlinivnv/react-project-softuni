import { Link } from "react-router";
import "./styles.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}
