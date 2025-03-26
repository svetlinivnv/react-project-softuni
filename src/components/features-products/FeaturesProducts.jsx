import { useEffect, useState } from "react";
import dataService from "../../services/dataService";
import { Link } from "react-router";

export default function FeaturedProducts() {
  const featuredProductsLimit = 5;
  const [products, setProducts] = useState([]);
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
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
