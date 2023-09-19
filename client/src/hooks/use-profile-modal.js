
import { useState, useEffect } from "react";

const useModal = (duration = 3000) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    if (showModal) {
      const timeoutId = setTimeout(() => {
        setShowModal(false);
      }, duration);
      return () => clearTimeout(timeoutId);
    }
  }, [showModal]);

  return {
    showModal,
    modalMessage,
    modalType,
    setModalMessage,
    setModalType,
    setShowModal,
  };
};

export default useModal;
