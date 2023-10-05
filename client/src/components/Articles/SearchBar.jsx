import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";
import useDebounce from "../../hooks/use-debounce"; // Modify this import path based on your folder structure

const SearchBar = React.memo(props => {
  const [textFilter, setTextFilter] = useState("");
  const debouncedTextFilter = useDebounce(textFilter, 300); // 300ms delay

  useEffect(() => {
      props.onFiltersSubmit({ text: debouncedTextFilter });
  }, [debouncedTextFilter]);

  const handleTextChange = (e) => {
    setTextFilter(e.target.value);
  };

  const submitHandler = (e) => {
    e && e.preventDefault();
    props.onFiltersSubmit({ text: debouncedTextFilter });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
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
      </div>
    </div>
  );
});

export default SearchBar;
