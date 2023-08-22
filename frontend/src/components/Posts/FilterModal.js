import React, { useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./FilterModal.module.css";
import './ModalAnimation.css';
import CSSTransition from "react-transition-group/CSSTransition";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const FilterModal = ({ isOpen, onClose }) => {
  // Create a ref for the modal
  const nodeRef = useRef(null);

  return ReactDOM.createPortal(
    <CSSTransition
      nodeRef={nodeRef}  // Add the ref here
      mountOnEnter
      unmountOnExit
      in={isOpen}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exit: "",
        exitActive: "ModalClosed",
      }}
    >
      <div 
        ref={nodeRef}  // Apply the ref to your root modal element
        className={classes.modalOverlay} 
        onClick={onClose}
      >
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Filtry</h2>
          {/* Miejsce na konkretne filtry */}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("modal-root")
  );
};

export default FilterModal;
