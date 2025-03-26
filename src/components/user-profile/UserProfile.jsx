import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import "./styles.css";
import dataService from "../../services/dataService";

export default function UserProfile() {
  const { user } = useAuth();
  const auth = getAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePictureUrl: "",
    newPassword: "",
    currentPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.displayName || "",
        email: user.email || "",
        profilePictureUrl: user.photoURL || "",
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const reauthenticate = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        formData.currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      return true;
    } catch (error) {
      console.error("Reauthentication failed:", error);
      alert("Incorrect password. Please try again.");
      return false;
    }
  };

  const submitAction = async (event) => {
    event.preventDefault();

    try {
      if (formData.newPassword) {
        if (!(await reauthenticate())) {
          return;
        }
        await updatePassword(auth.currentUser, formData.newPassword);
        alert("Password updated successfully!");
      }

      await updateProfile(auth.currentUser, {
        displayName: formData.username,
        photoURL: formData.profilePictureUrl,
      });

      if (auth.currentUser.email !== formData.email) {
        if (!(await reauthenticate())) {
          return;
        }
        await updateEmail(auth.currentUser, formData.email);
      }

      await dataService.updateDocument("users", user.uid, {
        username: formData.username,
        email: formData.email,
        profilePictureUrl: formData.profilePictureUrl,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
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

        <label>Current Password (Required for Email/Password Change):</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <label>New Password (Leave empty if not changing):</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
