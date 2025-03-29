import "./styles.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import dataService from "../../services/dataService";
import Loader from "../loader/Loader";
import DeleteConfirmation from "../delete-confirmation/DeleteConfirmation";

export default function ProductDetails() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const userId = user?.user?.uid;
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await dataService.getDocumentById(
          "products",
          productId
        );

        if (!productData) {
          navigate("/404");
          return;
        }

        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleDelete = async () => {
    try {
      await dataService.deleteDocument("products", productId);
      setIsModalOpen(false);
      navigate("/catalog");
    } catch (err) {
      alert("Error deleting product: ", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="product-details">
      <div className="product-image">
        <img
          src={product.imageUrl || "https://via.placeholder.com/400"}
          alt={product.name}
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
        {userId !== product.createdBy && (
          <button
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>
          <strong style={{ color: "#007bff" }}>Price:</strong> $
          {product.price.toFixed(2)}
        </p>
        <p>{product.description}</p>
        <p>
          <strong>Created on:</strong>{" "}
          {new Date(product.createdAt.seconds * 1000).toLocaleString()}
        </p>

        {userId === product.createdBy && (
          <div className="buttons">
            <button onClick={() => navigate(`/catalog/${productId}/edit`)}>
              Edit
            </button>
            <button onClick={() => setIsModalOpen(true)}>Delete</button>
            <DeleteConfirmation
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
