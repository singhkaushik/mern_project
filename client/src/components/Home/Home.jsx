import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../Common/Hero/HeroSection";

const Home = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      <Header />
      {location.pathname === "/" && <HeroSection />}
      <main className={isAuthPage ? "container mt-4 mb-4" : ""}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Home;
