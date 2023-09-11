import "../App.css";
import HeaderNavigation from "../components/HeaderNavigation";
import {
  Outlet,
  useLocation,
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import backgroundImage from "../assets/images/blog-background.jpg";
import { getTokenDuration } from "../utils/auth";
import MessageModal from "../ui/MessageModal/MessageModal";

const RootLayout = (props) => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const params = new URLSearchParams(location.search);
  const searchParams = {};
  params.forEach((value, key) => {
    searchParams[key] = value;
  });

  const status = searchParams.status;

  let modalMessage, type;

  if (status) {
    modalMessage = `You have successfully ${
      status === "logged-in" ? "logged in" : "signed up"
    }`;
    type = "success";
  }

  useEffect(() => {
    if (modalMessage && type) {
      setShowModal(true);
    }
  }, [modalMessage, type]);

  const closeModal = () => {
    setShowModal(false);
  };

  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const element = <div className="add_space"></div>;
  const HeaderNavigationHandler = () => {
    if (
      location.pathname === "/articles" ||
      location.pathname === "/contact" ||
      location.pathname === "/"
    )
      return <HeaderNavigation />;
    return element;
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }
    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <img src={backgroundImage} alt="background" className="bg-image" />
      {showModal && (
        <MessageModal message={modalMessage} type={type} onClose={closeModal} />
      )}
      {HeaderNavigationHandler()}
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
