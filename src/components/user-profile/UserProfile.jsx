import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import authService from "../../services/authService";
import "./styles.css";

export default function UserProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.displayName || "",
    email: user?.email || "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.username || formData.username.length < 3) {
      isValid = false;
      errors.username = "Username must be at least 3 characters long.";
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      isValid = false;
      errors.newPassword = "Password must be at least 6 characters long.";
    }

    if (
      formData.newPassword &&
      formData.confirmPassword !== formData.newPassword
    ) {
      isValid = false;
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors);
    return isValid;
  };

  const submitAction = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    try {
      await authService.updateUserProfile(user, formData);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. " + err.message);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={submitAction}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className={formErrors.username ? "invalid" : ""}
        />
        {formErrors.username && (
          <div className="error-text">{formErrors.username}</div>
        )}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="readonly"
        />

        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className={formErrors.newPassword ? "invalid" : ""}
        />
        {formErrors.newPassword && (
          <div className="error-text">{formErrors.newPassword}</div>
        )}

        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={formErrors.confirmPassword ? "invalid" : ""}
        />
        {formErrors.confirmPassword && (
          <div className="error-text">{formErrors.confirmPassword}</div>
        )}

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
