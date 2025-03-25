import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import ProductCreate from "./components/product-create/ProductCreate";
import Catalog from "./components/catalog/Catalog";
import UserProfile from "./components/user-profile/UserProfile";
import Logout from "./components/logout/logout";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <>
        <div className="main-content">
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
            <Route
              path="/create"
              element={<ProductCreate />}
            />
            <Route
              path="/profile"
              element={<UserProfile />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/logout"
              element={<Logout />}
            />
          </Routes>
        </div>
        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;
