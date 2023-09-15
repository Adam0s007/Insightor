import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { useSearchParams } from "react-router-dom";
import classes from "./FilterModal.module.css";
import FilterContent from "./FilterContent";

const FilterModal = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(props.fechObject);

  let initialFilters = {
    authorName: searchParams.get("authorName") || "",
    authorSurname: searchParams.get("authorSurname") || "",
    dateFrom: searchParams.get("dateFrom") || "",
    dateTo: searchParams.get("dateTo") || "",
    rating: +searchParams.get("rating") || 0,
    sort: searchParams.get("sort") || "", 
    order: searchParams.get("order") || "",
  };
  
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

  const anyFieldFilled = useMemo(() => {
    return Object.values(filters).some((value) => {
      if (typeof value === "string") return value !== "";
      if (typeof value === "number") return !isNaN(value) && isFinite(value);
      return false;
    });
  }, [filters]);

  const handleApply = () => {
    let newSearchParams = new URLSearchParams(searchParams.toString()); // clone the searchParams

    for (let key in filters) {
      if (filters[key]) {
        newSearchParams.set(key, filters[key]);
      }
    }

    setSearchParams(newSearchParams);
    setPrevFilters(filters);
    setFiltersChanged(false);
    
    props.onClose();
  };

  const handleReset = () => {
    initialFilters = {
      authorName: "",
      authorSurname: "",
      dateFrom: "",
      dateTo: "",
      rating: 0,
      sort: "", // Resetting sorting state
      order: ""      // Resetting sorting state
    };
    let newSearchParams = new URLSearchParams(); // create a fresh searchParams
    setSearchParams(newSearchParams);
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
