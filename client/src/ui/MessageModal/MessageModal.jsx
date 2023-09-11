import React from 'react-dom';
import styles from './MessageModal.module.css';

const MessageModal = ({ message, type, onClose }) => {
  const modalStyles = type === 'success' ? styles.successModal : styles.errorModal;

  return React.createPortal(
    <div className={modalStyles}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>X</span>
        <p>{message}</p>
          <button className={styles.btn} onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root')  // Poprawiona linia tutaj
  );
};

export default MessageModal;
