import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import dataService from "../../services/dataService";
import { useAuth } from "../../contexts/AuthContext";
import "./styles.css";

export default function ProductEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.user?.uid;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await dataService.getDocumentById(
          "products",
          productId
        );
        setProduct(productData);
      } catch (err) {
        alert("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const submitAction = (formData) => {
    const updatedProduct = Object.fromEntries(formData);
    updatedProduct.price = Number(updatedProduct.price);

    try {
      dataService.updateDocument("products", productId, updatedProduct);
      navigate(`/catalog/${productId}`);
    } catch (err) {
      alert("Error updating product: ", err);
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form action={submitAction}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            defaultValue={product.description}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            defaultValue={product.imageUrl}
            required
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
