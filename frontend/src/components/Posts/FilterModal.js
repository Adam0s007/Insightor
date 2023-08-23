
import React, {useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./FilterModal.module.css";
import './ModalAnimation.css';
import CSSTransition from "react-transition-group/CSSTransition";
import FilterContent from "./FilterContent";
const animationTiming = {
  enter: 160,
  exit: 160,
};

const FilterModal = (props) => {
    const nodeRef = useRef(null);

    const handleApplyFilters = (newFilters) => {
        props.onNewFilters(newFilters);
        props.onClose();
    }

    return ReactDOM.createPortal(
        <CSSTransition
            nodeRef={nodeRef}
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
                ref={nodeRef}
                className={classes.modalOverlay} 
                onClick={props.onClose}
            >
                <div
                    className={classes.modalContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <FilterContent onApplyFilters={handleApplyFilters} />
                    <button onClick={props.onClose} className={classes['button__close']}>Close</button>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("modal-root")
    );
};

export default FilterModal;