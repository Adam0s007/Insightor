import { useState, useEffect } from "react";
import styles from "./MessageModal.module.css";
import React from "react-dom";

const MessageModal = ({ message, type, onClose }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(onClose, 500);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const modalStyles =
    type === "success" ? styles.successModal : styles.errorModal;

  return React.createPortal(
    <div className={modalStyles}>
      <div
        className={`${styles.modalContent} ${isFading ? styles.fadeOut : ""}`}
      >
        <p>{message}</p>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default MessageModal;
