import React from 'react';
import styles from './MessageModal.module.css';

const MessageModal = ({ message, type, onClose }) => {
  const modalStyles = type === 'success' ? styles.successModal : styles.errorModal;

  return (
    <div className={modalStyles}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>X</span>
        <p>{message}</p>
        {type === 'success' && (
          <button className={styles.btn} onClick={onClose}>Show updated article</button>
        )}
        {type === 'error' && (
          <button className={styles.btn} onClick={onClose}>Try again</button>
        )}
      </div>
    </div>
  );
};

export default MessageModal;
