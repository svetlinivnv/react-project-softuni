import "./styles.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router";

import authService from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (name === "username" && (!value || value.trim().length < 3)) {
      error = "Username must be at least 3 characters long!";
    }

    if (name === "email" && (!value || !/^\S+@\S+\.\S+$/.test(value))) {
      error = "Please enter a valid email address!";
    }

    if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long!";
    }

    if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match!";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = "Username is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.password) newErrors.password = "Password is required!";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required!";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match!";

    setErrors(newErrors);
    setGlobalError("");
    return Object.keys(newErrors).length === 0;
  };

  const submitAction = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setGlobalError("");
      await authService.registerUser(
        formData.email,
        formData.password,
        formData.username
      );
      navigate("/");
    } catch (err) {
      setGlobalError(err.message);
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
    <div className="register-container">
      <h2>Register</h2>
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <p className="error">{errors.email}</p>}
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

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit">Register</button>
        {globalError && <p className="error">{globalError}</p>}
      </form>
      <div className="login-link">
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <strong>Login here</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}
