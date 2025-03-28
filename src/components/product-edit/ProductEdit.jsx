import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { useAuth } from "../../contexts/AuthContext";
import dataService from "../../services/dataService";
import Loader from "../loader/Loader";

export default function ProductEdit() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productId } = useParams();
  const userId = user?.uid;

  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await dataService.getDocumentById(
          "products",
          productId
        );
        setProduct(productData);
        setImageUrl(productData.imageUrl);
        setPreviewUrl(productData.imageUrl);
        if (userId !== productData.createdBy) {
          navigate(`/catalog/${productId}`);
        }
      } catch (err) {
        alert("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Loader />;
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

  const handleUrlBlur = () => {
    setPreviewUrl(imageUrl);
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
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onBlur={handleUrlBlur}
            required
          />
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
