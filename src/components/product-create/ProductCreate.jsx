import { Timestamp } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import dataService from "../../services/dataService";
import "./styles.css";
import { useNavigate } from "react-router";

export default function AddProduct() {
  const navigate = useNavigate();
  const user = useAuth();
  const userId = user.user.uid;
  const username = user.user.displayName;

  const submitAction = (formData) => {
    let productData = Object.fromEntries(formData);
    const productId = "id_" + Math.random().toString(36).substr(2, 9);

    productData.price = Number(productData.price);
    productData.productId = productId;
    productData.createdBy = userId;
    productData.ownerName = username;
    productData.createdAt = Timestamp.now();

    try {
      dataService.createDocument("products", productData);
      navigate("/catalog");
    } catch (err) {
      alert("Error adding document: ", err);
    }
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
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
