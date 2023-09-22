import "../App.css";
import HeaderNavigation from "../components/HeaderNavigation";
import {
  Outlet,
  
  useLoaderData,
  useSubmit,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import backgroundImage from "../assets/images/blog-background.jpg";
import { getTokenDuration } from "../utils/auth";
import MessageModal from "../ui/MessageModal/MessageModal";

import {useStatusModal} from '../hooks/use-status-modal'

const RootLayout = (props) => {
  const { modalMessage, type,location } = useStatusModal();
  const [showModal, setShowModal] = useState(Boolean(modalMessage));

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
      location.pathname === "/" ||
      location.pathname.startsWith("/user")
     
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
      
      {showModal && (
        <MessageModal message={modalMessage} type={type} onClose={closeModal}/>
      )}
      {HeaderNavigationHandler()}
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
