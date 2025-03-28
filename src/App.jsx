import "./App.css";
import { Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

import GuestGuard from "./components/guards/GuestGuard";
import AuthGuard from "./components/guards/AuthGuard";

import Login from "./components/login/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import ProductCreate from "./components/product-create/ProductCreate";
import Catalog from "./components/catalog/Catalog";
import UserProfile from "./components/user-profile/UserProfile";
import Logout from "./components/logout/logout";
import ProductDetails from "./components/product-details/ProductDetails";
import ProductEdit from "./components/product-edit/ProductEdit";
import NotFound from "./components/not-found/NotFound";
import ShoppingCart from "./components/shopping-cart/ShoppingCart";

function App() {
  return (
    <AuthProvider>
      <div className="main-content">
        <CartProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/catalog"
              element={<Catalog />}
            />
            <Route element={<GuestGuard />}>
              <Route
                path="/create"
                element={<ProductCreate />}
              />
              <Route
                path="/catalog/:productId/edit"
                element={<ProductEdit />}
              />
              <Route
                path="/profile"
                element={<UserProfile />}
              />
              <Route
                path="/cart"
                element={<ShoppingCart />}
              />
              <Route
                path="/logout"
                element={<Logout />}
              />
            </Route>
            <Route
              path="/catalog/:productId"
              element={<ProductDetails />}
            />

            <Route element={<AuthGuard />}>
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
            </Route>
            <Route
              path="/404"
              element={<NotFound />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </CartProvider>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
