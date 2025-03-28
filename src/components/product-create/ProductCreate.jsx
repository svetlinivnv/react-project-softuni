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

  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const submitAction = (formData) => {
    let productData = Object.fromEntries(formData);
    const productId = "id_" + Math.random().toString(36).substr(2, 9);

    productData.price = Number(productData.price);
    productData.productId = productId;
    productData.createdBy = userId;
    productData.ownerName = username;
    productData.createdAt = Timestamp.now();

    try {
      dataService.createDocument("products", productId, productData);
      navigate("/catalog");
    } catch (err) {
      alert("Error adding document: ", err);
    }
  };

  const handleUrlBlur = () => {
    setPreviewUrl(imageUrl);
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form action={submitAction}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          rows="4"
          required
        ></textarea>

        <label>Price:</label>
        <input
          type="number"
          name="price"
          required
          step="0.01"
        />

        <label>Image URL:</label>
        <input
          type="url"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onBlur={handleUrlBlur}
          required
        />

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
