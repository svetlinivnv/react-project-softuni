import { useState } from "react";
import "./styles.css";
import authService from "../../services/authService";
import { useNavigate } from "react-router";

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

  const validateForm = (registerData) => {
    const newErrors = {};

    if (!registerData.username) newErrors.username = "Username is required!";
    if (!registerData.email) newErrors.email = "Email is required!";
    if (!registerData.password) newErrors.password = "Password is required!";
    if (registerData.password && registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long!";
    }
    if (!registerData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required!";
    if (registerData.password !== registerData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match!";

    setErrors(newErrors);
    setGlobalError("");
    return Object.keys(newErrors).length === 0;
  };

  const submitAction = async (event) => {
    event.preventDefault();
    const registerData = { ...formData };
    console.log(registerData);

    if (!validateForm(registerData)) return;

    try {
      setGlobalError("");
      await authService.registerUser(
        registerData.email,
        registerData.password,
        registerData.username
      );
      navigate("/");
    } catch (err) {
      setGlobalError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit">Register</button>
        {globalError && <p className="error">{globalError}</p>}
      </form>
    </div>
  );
}
