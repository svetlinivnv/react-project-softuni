import "./styles.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { truncateText } from "../../utils/textUtils";
import dataService from "../../services/dataService";
import Loader from "../loader/Loader";
import DeleteConfirmation from "../delete-confirmation/DeleteConfirmation";

export default function Catalog() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const handleDelete = async (productId) => {
    try {
      await dataService.deleteDocument("products", productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.productId !== productId)
      );
      setIsModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      alert("Error deleting product: ", err);
    }
  };

  useEffect(() => {
    dataService.getAllDocuments("products").then((products) => {
      setProducts(products);
    });
  }, []);

  if (!products) {
    return <Loader />;
  }

  return (
    <div className="catalog-container">
      <h2>Product Catalog</h2>
      <div className="product-list">
        {!products || products.length === 0 ? (
          <h3>No products to display...</h3>
        ) : (
          products.map((product) => (
            <div
              className="product"
              key={product.productId}
            >
              {userId === product.createdBy && (
                <div className="product-actions">
                  <i
                    className="fa-solid fa-pen-to-square edit-icon"
                    onClick={() =>
                      navigate(`/catalog/${product.productId}/edit`)
                    }
                  ></i>
                  <i
                    className="fa-solid fa-trash delete-icon"
                    onClick={() => {
                      setIsModalOpen(true);
                      setProductToDelete(product.productId);
                    }}
                  ></i>
                  <DeleteConfirmation
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => handleDelete(productToDelete)}
                  />
                </div>
              )}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <Link to={`/catalog/${product.productId}`}>
                <h3>{product.name}</h3>
              </Link>
              <p>{truncateText(product.description, 100)}</p>
              <p>
                <strong>${product.price.toFixed(2)}</strong>
              </p>
              {userId !== product.createdBy && (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
