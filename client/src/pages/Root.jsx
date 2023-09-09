import "../App.css";
import HeaderNavigation from "../components/HeaderNavigation";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
import backgroundImage from "../assets/images/blog-background.jpg";
const RootLayout = (props) => {
  const { pathname } = useLocation();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const element = <div className="add_space"></div>
  const HeaderNavigationHandler = () => {
    if (
      location.pathname.startsWith("/articles") &&
      location.pathname !== "/articles"
    ) {
      return element;
    }
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" 
    ) {
      return element;
    }
    return <HeaderNavigation />;
  };

  return (
    <>
      <img src={backgroundImage} alt="background" className="bg-image" />
      {HeaderNavigationHandler()}
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
