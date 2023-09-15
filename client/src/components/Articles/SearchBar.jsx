import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import FilterModal from "./FilterModal";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [textFilter, setTextFilter] = useState(searchParams.get("text") || "");
  const [sortCriteria, setSortCriteria] = useState(
    searchParams.get("sort") || ""
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("order") || ""
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = props.token;
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

  const handleCriteriaChange = (e) => {
    const newCriteria = e.target.value;
    setSortCriteria(newCriteria);
    searchParams.set("sort", newCriteria);
    setSearchParams(searchParams);
    submitHandler();
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    searchParams.set("order", newOrder);
    setSearchParams(searchParams);
    submitHandler();
  };

  const submitHandler = (e) => {
    e && e.preventDefault();
    if (props.isPending) return;
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
          <FaFilter
            onClick={() => !props.isPending && setIsModalOpen(true)}
            className={styles.icon}
          />
        </div>
      </form>

      <div className={`${styles.searchContainer} ${styles.sortSection}`}>
        <select onChange={handleCriteriaChange} value={sortCriteria}>
          <option value="" disabled>Sort By</option>
          <option value="date">Date</option>
          <option value="reviews">Popularity</option>
          <option value="rating">Rating</option>
        </select>

        <select onChange={handleOrderChange} value={sortOrder}>
          <option value="" disabled>sort type</option>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      {token && (
        <div className={`${styles.searchContainer} ${styles.new}`}>
          <Link to="/articles/new" className={styles.searchInput}>
            Create new article
          </Link>
        </div>
      )}

      {isModalOpen && (
        <FilterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
