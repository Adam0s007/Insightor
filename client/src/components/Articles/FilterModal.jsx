import React, { useState,useMemo,useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import classes from "./FilterModal.module.css";
import FilterContent from "./FilterContent";
import { updateFilters, resetFilters,initialFilters } from '../../store/filters-slice';

const FilterModal = (props) => {
  const filters = useSelector(state => state.filters);
  const [localFilters, setLocalFilters] = useState(filters);
  
  const dispatch = useDispatch();
  const [filtersChanged, setFiltersChanged] = useState(false);

  useEffect(() => {
    if (JSON.stringify(localFilters) !== JSON.stringify(filters)) {
      setFiltersChanged(true);
    } else {
      setFiltersChanged(false);
    }
  }, [localFilters, filters]);

  const anyFieldFilled = useMemo(() => {
    return Object.values(localFilters).some((value) => {
      if (typeof value === "string") return value !== "";
      if (typeof value === "number") return !isNaN(value) && isFinite(value);
      return false;
    });
  }, [filters]);

  const handleApply = (e) => {
    dispatch(updateFilters(localFilters));
    setFiltersChanged(false);
    props.onClose(true);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setLocalFilters(initialFilters); 
    setFiltersChanged(true);
  };

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={() => props.onClose(false)}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <FilterContent filters={localFilters} setFilters={setLocalFilters} filtersChanged={filtersChanged} />
        <div className={classes.group}>
          <button onClick={() => props.onClose(false)} className={classes.button}>
            Close
          </button>
          <button
            onClick={handleReset}
            className={` ${classes.button} ${classes.resetButton}`}
            disabled={!anyFieldFilled}
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className={` ${classes.button} ${classes.applyButton}`}
            disabled={!filtersChanged}
          >
            Apply
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("filter-modal")
  );
};

export default FilterModal;
