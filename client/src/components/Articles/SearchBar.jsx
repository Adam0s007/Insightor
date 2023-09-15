import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterModal from "./FilterModal";
import styles from "./SearchBar.module.css";
const SearchBar = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [textFilter, setTextFilter] = useState(searchParams.get("text") || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const currentText = searchParams.get("text");
    if (currentText !== textFilter) {
      setTextFilter(currentText || "");
    }
  }, [searchParams]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setTextFilter(newText);
    
    searchParams.set("text", newText);
    setSearchParams(searchParams);
 
  };

  const submitHandler = (e) => {
    
    if(e){
      e.preventDefault();
    }
    
    if(props.isPending) return;
      props.onFiltersSubmit(); // assuming this will handle other filters and the search itself
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={submitHandler} className={styles.searchContainer}>
        {props.isPending && <div className={styles.overlay}></div>}
        <input
          type="text"
          value={textFilter}
          onChange={handleTextChange}
          placeholder="Search "
          className={styles.searchInput}
          disabled={props.isPending} // Dezaktywuj input, gdy isPending jest true
        />
        <div className={styles.icons}>
          <FaSearch className={styles.icon} onClick={submitHandler} />
          <FaFilter
            onClick={() => !props.isPending && setIsModalOpen(true)} // Zapobiegaj otwieraniu modalu, gdy isPending jest true
            className={styles.icon}
          />
        </div>
        {isModalOpen && (
          <FilterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            
          />
        )}
      </form>
    </div>
  );
};

export default SearchBar;
