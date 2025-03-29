import { useEffect, useState } from "react";
import dataService from "../../services/dataService";
import { Link, useNavigate } from "react-router";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const featuredProductsLimit = 4;
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const userId = user?.user?.uid;

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  useEffect(() => {
    try {
      dataService.getAllDocuments("products").then((products) => {
        setProducts(products);
      });
    } catch (err) {
      alert("Error fetching products: ", err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return null;
  }

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
            {userId !== product.createdBy && (
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
