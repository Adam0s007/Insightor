import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { IoMdReturnLeft } from 'react-icons/io';
import styles from './ModalWithMenu.module.css';
import Exit from '../../../ui/Exit/Exit'
const animationTiming = {
  enter: 1000,
  exit: 2000,
};

const ModalWithMenu = ({ isModalVisible, closeModal, content, menuClickHandler }) => {
  const modalContent = (
    <>
      <div
        className={`${styles.backdrop} ${
          isModalVisible ? styles.backdropActive : ""
        }`}
        onClick={closeModal}
      />
      <CSSTransition
        in={isModalVisible}
        mountOnEnter
        unmountOnExit
        timeout={animationTiming}
        classNames={{
          enter: "",
          enterActive: "ModalOpen",
          exit: "",
          exitActive: "ModalClosed",
        }}
      >
        <div className={styles.newContent}>
          {/* <button type="button" className={styles.closeButton} onClick={closeModal}><IoMdReturnLeft /></button> */}
          <Exit onClick={closeModal} />
          {content}
        </div>
      </CSSTransition>
      <div className={`${styles.menu} ${isModalVisible ? styles.menuActive : ""}`}>
        <button
          className={styles.reviewArticleButton}
          onClick={() => menuClickHandler('reviews')}
        >
          Reviews
        </button>
        <button
          className={styles.reviewArticleButton}
          onClick={() => menuClickHandler('reviews')}
        >
          Edit
        </button>
      </div>
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')  // Assuming you have a div with this id in your index.html
  );
}

export default ModalWithMenu;
