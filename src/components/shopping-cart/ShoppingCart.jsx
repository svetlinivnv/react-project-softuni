import "./styles.css";
import { Link } from "react-router";
import { useCart } from "../../contexts/CartContext";
import OrderDetails from "../order-details/OrderDetails";
import { useState } from "react";

export default function ShoppingCart() {
  const { cart, removeFromCart } = useCart();
  const [checkout, setCheckout] = useState(false);

  const handleCheckout = () => {
    setCheckout(true);
  };

  const totalSum = cart.reduce(
    (sum, product) => sum + (product.price * product.quantity || 0),
    0
  );

  return (
    <section className="cart-container">
      {checkout ? (
        <OrderDetails />
      ) : (
        <>
          {cart.length > 0 ? (
            <>
              <h2>Shopping Cart</h2>
              {cart.map((product) => (
                <div
                  className="cart-item"
                  key={product.productId}
                >
                  <a
                    className="delete"
                    onClick={() => removeFromCart(product.productId)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </a>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                  />
                  <div className="cart-item-details">
                    <Link to={`/catalog/${product.productId}`}>
                      <div className="cart-item-name">{product.name}</div>
                    </Link>
                    <div className="cart-item-price">
                      Price: {(product.price * product.quantity).toFixed(2)} lv.
                    </div>
                    <div className="cart-item-quantity">
                      Quantity: {product.quantity || 1}
                    </div>
                  </div>
                </div>
              ))}
              <div className="cart-total">
                <span id="total-price">Total: {totalSum.toFixed(2)} lv.</span>
              </div>
              <button
                onClick={handleCheckout}
                className="checkout-btn"
              >
                Checkout
              </button>
            </>
          ) : (
            <p className="cart-empty">Your shopping cart is empty!</p>
          )}
        </>
      )}

      {/* This button is rendered regardless of checkout state */}
      <Link to="/catalog">
        <button className="checkout-btn">Back to Catalog</button>
      </Link>
    </section>
  );
}
