import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import { useDispatch} from 'react-redux';
import { updateFilters } from "../../store/filters-slice";

const SearchBar = (props) => {
  const dispach = useDispatch();
  const [textFilter, setTextFilter] = useState("");
  
  const handleTextChange = (e) => {
    setTextFilter(e.target.value);
  };

  const submitHandler = (e) => {
    e && e.preventDefault();
    if (props.isPending) return;
    dispach(updateFilters({text:textFilter}));
    props.onFiltersSubmit();
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={submitHandler} className={styles.searchContainer}>
        {props.isPending && <div className={styles.overlay}></div>}
        <input
          type="text"
          value={textFilter}
          onChange={handleTextChange}
          placeholder="Search"
          className={styles.searchInput}
          disabled={props.isPending}
        />
        <div className={styles.icons}>
          <FaSearch className={styles.icon} onClick={submitHandler} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
