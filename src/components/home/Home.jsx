import { useAuth } from "../../contexts/AuthContext";
import FeaturedProducts from "../features-products/FeaturesProducts";
import Hero from "../hero/Hero";
import Loader from "../loader/Loader";

export default function Home() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
