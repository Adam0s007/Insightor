import React, { useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./FilterModal.module.css";
import './ModalAnimation.css';
import CSSTransition from "react-transition-group/CSSTransition";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const FilterModal = (props) => {
    const newFilterHandler = (newFilter) => {
        props.onNewFilters(newFilter);
    }
    

  const nodeRef = useRef(null);
  return ReactDOM.createPortal(
    <CSSTransition
      nodeRef={nodeRef}  // Add the ref here
      mountOnEnter
      unmountOnExit
      in={props.isOpen}
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
        onClick={props.onClose}
      >
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
            <div className={classes.filterContent} 
            //this is a wrapper for filter elements
            >
                <h4>Filter Posts</h4>
            </div>

          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("modal-root")
  );
};

export default FilterModal;
