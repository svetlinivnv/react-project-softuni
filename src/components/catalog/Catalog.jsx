import "./styles.css";

const products = [
  {
    name: "Product 1",
    price: 25.99,
    description: "Description of product 1",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 2",
    price: 35.99,
    description: "Description of product 2",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Product 3",
    price: 45.99,
    description: "Description of product 3",
    imageUrl: "https://via.placeholder.com/150",
  },
  // More products can be added here
];

export default function Catalog() {
  return (
    <div className="catalog-container">
      <h2>Product Catalog</h2>
      <div className="product-list">
        {products.map((product, index) => (
          <div
            className="product"
            key={index}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
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
