import { useDispatch, useSelector } from "react-redux";
import React, { useState,useRef } from "react";
import ReactDOM from "react-dom";
import classes from "./FilterModal.module.css";
import './ModalAnimation.css';
import CSSTransition from "react-transition-group/CSSTransition";
import { filtersActions } from "../../store/filters-slice";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const FilterModal = (props) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.filters);
  
  // Lokalny stan dla inputów
  const [date, setDate] = useState(currentFilters.date);
  const [personName, setPersonName] = useState(currentFilters.personName);
  const [img, setImg] = useState(currentFilters.img);

  const applyFilters = () => {
    const newFilters = { date, personName, img };
    props.onNewFilters(newFilters);
    props.onClose();
  }

  const resetFiltersHandler = () => {
    dispatch(filtersActions.resetFilters());  
    setDate("");
    setPersonName("");
    setImg("");
  }

  const nodeRef = useRef(null);
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
            <div className={classes.filterContent}>
                <h4>Filter Posts</h4>
                <input 
                  type="text" 
                  placeholder="Date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={personName}
                  onChange={e => setPersonName(e.target.value)}
                />
                <input 
                  type="text" 
                  placeholder="Image URL" 
                  value={img}
                  onChange={e => setImg(e.target.value)}
                />
                <button onClick={applyFilters}>Apply Filters</button>
                <button onClick={resetFiltersHandler}>Reset Filters</button>
            </div>

          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("modal-root")
  );
};

export default FilterModal;
