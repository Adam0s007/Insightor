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
    setTextFilter(e.target.value);
  };

  const handleSearchClick = () => {
    searchParams.set("text", textFilter);
    setSearchParams(searchParams);
    props.onFiltersSubmit({ text: textFilter });
  };

  const handleFiltersSubmit = (filters) => {
    //props.onFiltersSubmit({ ...filters, text: textFilter });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={textFilter}
          onChange={handleTextChange}
          placeholder="Search "
          className={styles.searchInput}
        />
        <div className={styles.icons}>
          <FaSearch onClick={handleSearchClick} className={styles.icon} />
          <FaFilter
            onClick={() => setIsModalOpen(true)}
            className={styles.icon}
          />
        </div>
        {isModalOpen && (
          <FilterModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onApplyFilters={handleFiltersSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
