import "../App.css";
import HeaderNavigation from "../components/HeaderNavigation";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
import backgroundImage from "../assets/images/blog-background.jpg";
const RootLayout = (props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <img src={backgroundImage} alt="background" className="bg-image" />
      <HeaderNavigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
