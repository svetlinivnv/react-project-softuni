import { useState } from "react";
import "./styles.css";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePictureUrl: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitAction = (event) => {
    event.preventDefault();
    // Handle profile update (e.g., save to backend or Firebase)
    console.log("Updated Profile Data:", formData);
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={submitAction}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Profile Picture URL:</label>
        <input
          type="url"
          name="profilePictureUrl"
          value={formData.profilePictureUrl}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
