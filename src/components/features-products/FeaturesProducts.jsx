export default function FeaturedProducts() {
  return (
    <section className="products">
      <h2>Featured Products</h2>
      <div className="product-list">
        <div className="product">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 1"
          />
          <h3>Product 1</h3>
          <p>$19.99</p>
          <button>Add to Cart</button>
        </div>
        <div className="product">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 2"
          />
          <h3>Product 2</h3>
          <p>$24.99</p>
          <button>Add to Cart</button>
        </div>
        <div className="product">
          <img
            src="https://via.placeholder.com/150"
            alt="Product 3"
          />
          <h3>Product 3</h3>
          <p>$29.99</p>
          <button>Add to Cart</button>
        </div>
      </div>
    </section>
  );
}
