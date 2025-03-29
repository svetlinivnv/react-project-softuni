import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import dataService from "../../services/dataService";
import "./styles.css";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function AddProduct() {
  const navigate = useNavigate();
  const user = useAuth();
  const userId = user.user.uid;
  const username = user.user.displayName;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.name || data.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters long.";
    }

    if (!data.description || data.description.trim().length < 10) {
      newErrors.description =
        "Description must be at least 10 characters long.";
    }

    if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!data.imageUrl || !isValidUrl(data.imageUrl)) {
      newErrors.imageUrl = "Image URL must be a valid URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && (!value || value.trim().length < 3)) {
      error = "Product name must be at least 3 characters long.";
    }

    if (name === "description" && (!value || value.trim().length < 10)) {
      error = "Description must be at least 10 characters long.";
    }

    if (name === "price" && (!value || isNaN(value) || Number(value) <= 0)) {
      error = "Price must be a positive number.";
    }

    if (name === "imageUrl" && (!value || !isValidUrl(value))) {
      error = "Image URL must be a valid URL.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const submitAction = (event) => {
    event.preventDefault();

    if (!validateForm(formData)) return;

    const productId = "id_" + Math.random().toString(36).substr(2, 9);

    const productData = {
      ...formData,
      price: Number(formData.price),
      productId,
      createdBy: userId,
      ownerName: username,
      createdAt: Timestamp.now(),
    };

    try {
      dataService.createDocument("products", productId, productData);
      navigate("/catalog");
    } catch (err) {
      alert("Error adding document: ", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "imageUrl") setPreviewUrl(value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);

    if (name === "imageUrl" && !isValidUrl(value)) {
      setPreviewUrl("");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={submitAction}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            step="0.01"
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
        </div>

        {previewUrl && (
          <div className="image-preview">
            <img
              src={previewUrl}
              alt="Preview"
              onError={() => setPreviewUrl("")}
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            />
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
