import { useEffect, useState } from "react";
import dataService from "../../services/dataService";
import { Link, useNavigate } from "react-router";
import { useCart } from "../../contexts/CartContext";

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const featuredProductsLimit = 5;
  const [products, setProducts] = useState([]);
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
  return (
    <section className="products">
      <h2>Latest Products</h2>
      <div className="product-list">
        {products.slice(0, featuredProductsLimit).map((product, productId) => (
          <div
            className="product"
            key={productId}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
            />
            <Link to={`/catalog/${product.productId}`}>
              <h3>{product.name}</h3>
            </Link>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
