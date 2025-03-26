import { useState } from "react";
import "./styles.css";
import authService from "../../services/authService";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const submitAction = (formData) => {
    const registerData = Object.fromEntries(formData);

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
    }

    try {
      authService.registerUser(registerData.email, registerData.password);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form action={submitAction}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
