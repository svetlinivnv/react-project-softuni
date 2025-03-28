import "./styles.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { useCart } from "../../contexts/CartContext";
import { truncateText } from "../../utils/textUtils";
import dataService from "../../services/dataService";
import Loader from "../loader/Loader";

export default function Catalog() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
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
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
