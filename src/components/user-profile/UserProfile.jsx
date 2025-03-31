import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import authService from "../../services/authService";
import "./styles.css";

export default function UserProfile() {
  const { user, setProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.displayName || "",
    email: user?.email || "",
    newPassword: "",
    confirmPassword: "",
    photoURL: user?.photoURL || "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
    photoURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "username" && (!value || value.trim().length < 3)) {
      error = "Username must be at least 3 characters long.";
    }

    if (name === "newPassword" && value && value.length < 6) {
      error = "Password must be at least 6 characters long.";
    }

    if (name === "confirmPassword" && value !== formData.newPassword) {
      error = "Passwords do not match.";
    }

    if (
      name === "photoURL" &&
      value &&
      !/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)$/i.test(value)
    ) {
      error =
        "Please enter a valid image URL (jpg, jpeg, png, gif, bmp, webp, svg, tiff, ico).";
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
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

    if (
      formData.photoURL &&
      !/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)$/i.test(
        formData.photoURL
      )
    ) {
      isValid = false;
      errors.photoURL =
        "Please enter a valid image URL (jpg, jpeg, png, gif, bmp, webp, svg, tiff, ico).";
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
      setProfile({ displayName: user.displayName });
    } catch (err) {
      setError("Failed to update profile. " + err.message);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <div className="user-image-container">
        <img
          src={formData.photoURL || "/images/default-user-image.png"}
          alt="User Profile"
          className="user-image"
        />
      </div>

      <form onSubmit={submitAction}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
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

        <label>Profile Picture URL</label>
        <input
          type="text"
          name="photoURL"
          value={formData.photoURL}
          onChange={handleChange}
          onBlur={handleBlur}
          className={formErrors.photoURL ? "invalid" : ""}
        />
        {formErrors.photoURL && (
          <div className="error-text">{formErrors.photoURL}</div>
        )}

        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
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
          onBlur={handleBlur}
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
