import { createContext, useContext, useEffect, useState } from "react";
import dataService from "../services/dataService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuth();
  const userId = user?.user?.uid;

  if (!user) {
    return null;
  }

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const cartData = await dataService.getDocumentById("carts", userId);
      setCart(cartData?.products || []);
      setLoading(false);
    } catch (error) {
      alert("Error fetching cart: " + error.message);
    }
  };

  const addToCart = async (product) => {
    if (!userId) {
      return;
    }

    product.quantity = 1;

    try {
      const cartData = await dataService.getDocumentById("carts", userId);
      const products = cartData?.products || [];

      const index = products.findIndex((item) => item.id === product.id);
      const filteredProducts = products.map((item, i) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      if (index === -1) {
        filteredProducts.push(product);
      }
      let updatedCart = {
        ...cartData,
        products: filteredProducts,
      };

      if (cartData) {
        await dataService.updateDocument("carts", userId, updatedCart);
      } else {
        await dataService.createDocument("carts", userId, updatedCart);
      }

      setCart(updatedCart.products);
    } catch (error) {
      alert("Error adding to cart: " + error.message);
    }
  };

  const removeFromCart = async (productId) => {
    if (!userId) return;

    try {
      const cartData = await dataService.getDocumentById("carts", userId);

      if (!cartData || !cartData.products) return;

      const updatedProducts = cartData.products.filter(
        (product) => product.productId !== productId
      );

      if (updatedProducts.length === 0) {
        await dataService.deleteDocument("carts", userId);
        setCart([]);
        return;
      }

      await dataService.updateDocument("carts", userId, {
        products: updatedProducts,
      });

      setCart(updatedProducts);
    } catch (error) {
      alert("Error removing from cart: " + error.message);
    }
  };

  const cartCheckout = async () => {
    try {
      await dataService.deleteDocument("carts", userId);
      setCart([]);
    } catch (err) {
      alert("Error on checkout: " + err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, removeFromCart, cartCheckout }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
