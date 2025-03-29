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
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await dataService.getDocumentById(
          "products",
          productId
        );
        setProduct(productData);
        setFormData({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          imageUrl: productData.imageUrl,
        });
        setPreviewUrl(productData.imageUrl);

        if (userId !== productData.createdBy) {
          navigate(`/catalog/${productId}`);
        }
      } catch (err) {
        alert("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [productId, userId, navigate]);

  if (!product) return <Loader />;

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

  const submitAction = async (event) => {
    event.preventDefault();

    const isValid = Object.keys(formData).every((field) => !errors[field]);
    if (!isValid) return;

    const updatedProduct = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      await dataService.updateDocument("products", productId, updatedProduct);
      navigate(`/catalog/${productId}`);
    } catch (err) {
      alert("Error updating product: ", err);
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
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={submitAction}>
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
