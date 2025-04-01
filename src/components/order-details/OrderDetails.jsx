import { useContext, useState } from "react";
import "./styles.css";
import { useCart } from "../../contexts/CartContext";

export default function OrderDetails({ handlePayment }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [error, setError] = useState("");
  const { cartCheckout } = useCart();

  const handleSubmit = () => {
    if (!name || !address || !bankAccount) {
      setError("All fields are required.");
      return;
    }

    setError("");
    cartCheckout();
    setOrderCompleted(true);
  };

  return (
    <>
      {orderCompleted ? (
        <p className="order-confirmed">Thank you for your order!</p>
      ) : (
        <div className="payment-details">
          <h2>Payment Details:</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bank Account"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleSubmit}>Confirm Payment</button>
        </div>
      )}
    </>
  );
}
