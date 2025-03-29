import { useState } from "react";
import "./styles.css";
import authService from "../../services/authService";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validateForm = (loginData) => {
    const newErrors = {};
    if (!loginData.username) newErrors.username = "Username is required!";
    if (!loginData.password) newErrors.password = "Password is required!";
    setErrors(newErrors);
    setGlobalError("");
    return Object.keys(newErrors).length === 0;
  };

  const submitAction = async (event) => {
    event.preventDefault();
    const loginData = { ...formData };
    if (!validateForm(loginData)) return;

    try {
      setGlobalError("");
      await authService.loginUser(loginData.username, loginData.password);
      navigate("/catalog");
    } catch (err) {
      setGlobalError(`Invalid username or password!`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={submitAction}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
        {globalError && <p className="error">{globalError}</p>}
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
