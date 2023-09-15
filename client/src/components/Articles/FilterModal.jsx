import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSearchParams } from "react-router-dom";
import classes from "./FilterModal.module.css";
import FilterContent from "./FilterContent";

const initialFilters = {
  authorName: "",
  authorSurname: "",
  dateFrom: "",
  dateTo: "",
  rating: 0,
};

const FilterModal = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const [prevFilters, setPrevFilters] = useState(initialFilters);
  const [filtersChanged, setFiltersChanged] = useState(false);

  useEffect(() => {
    if (JSON.stringify(filters) !== JSON.stringify(prevFilters)) {
      setFiltersChanged(true);
    } else {
      setFiltersChanged(false);
    }
  }, [filters, prevFilters]);

  const anyFieldFilled = Object.values(filters).some((value) => {
    if (typeof value === "string") return value !== "";
    if (typeof value === "number") return !isNaN(value) && isFinite(value);
    return false;
});


  const handleApply = () => {
    for (let key in filters) {
      if (filters[key]) {
        searchParams.set(key, filters[key]);
      }
    }
    setSearchParams(searchParams);
    setPrevFilters(filters);
    setFiltersChanged(false);
    props.onClose();
  };

  const handleReset = () => {
    const keys = Array.from(searchParams.keys());
    keys.forEach((key) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
    setFilters(initialFilters);
    setPrevFilters(initialFilters);
    setFiltersChanged(false);
  };

  return ReactDOM.createPortal(
    <div className={classes.modalOverlay} onClick={props.onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <FilterContent filters={filters} setFilters={setFilters} filtersChanged={filtersChanged} />
        <div className={classes.group}>
          <button onClick={props.onClose} className={classes.button}>
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