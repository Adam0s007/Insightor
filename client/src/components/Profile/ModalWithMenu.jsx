import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import {Link} from 'react-router-dom'
import styles from './ModalWithMenu.module.css';
import Exit from '../../ui/Exit/Exit'
import { useQuery } from '@tanstack/react-query';
import {fetchUser} from '../../utils/http'
import Profile from './Profile';

const animationTiming = {
  enter: 1000,
  exit: 2000,
};

const ModalWithMenu = ({ isModalVisible, closeModal }) => {
  
  const userObj = useQuery({
        queryKey: ['profile'],
        queryFn: (signal) => fetchUser(signal)
    })
  const content = <Profile user={userObj}/>
  
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
          <Exit onClick={closeModal} className={styles.exit} />
          {content}
        </div>
      </CSSTransition>
      
    </>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')  // Assuming you have a div with this id in your index.html
  );
}

export default ModalWithMenu;
