import { useEffect, useState } from "react";
import "./styles.css";
import dataService from "../../services/dataService";
import { truncateText } from "../../utils/textUtils";
import { Link } from "react-router";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dataService.getAllDocuments("products").then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <div className="catalog-container">
      <h2>Product Catalog</h2>
      <div className="product-list">
        {products.map((product, productId) => (
          <div
            className="product"
            key={productId}
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
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
