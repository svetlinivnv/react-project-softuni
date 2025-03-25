import { useState } from "react";
import "./styles.css";
import authService from "../../services/authService";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const submitAction = async (formData) => {
    const loginData = Object.fromEntries(formData);
    setUser(loginData);

    try {
      await authService.loginUser(loginData.username, loginData.password);
      navigate("/catalog");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form action={submitAction}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
