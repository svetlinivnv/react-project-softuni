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

    if (!validateForm(formData)) return;

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

  const handleUrlBlur = () => {
    if (!isValidUrl(formData.imageUrl)) setPreviewUrl("");
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
            onBlur={handleUrlBlur}
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
