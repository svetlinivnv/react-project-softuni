import { useState } from "react";
import "./styles.css";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (name === "username" && !value.trim()) {
      error = "Username is required!";
    }

    if (name === "password" && !value.trim()) {
      error = "Password is required!";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required!";
    if (!formData.password) newErrors.password = "Password is required!";

    setErrors(newErrors);
    setGlobalError("");
    return Object.keys(newErrors).length === 0;
  };

  const submitAction = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setGlobalError("");
      await authService.loginUser(formData.username, formData.password);
      navigate("/catalog");
    } catch (err) {
      setGlobalError("Invalid username or password!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
        {globalError && <p className="error">{globalError}</p>}
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
