import React from 'react';
import styles from "./ProfileArticles.module.css";
import {CategoryTags} from '../../../ui/Tag/Tag'
const SortMenu = ({ activeButton, handleSortChange,categories,handleCategoryChange }) => {
  return (
    <div className={styles.menu}>
      <button
        onClick={() => handleSortChange("date")}
        className={activeButton === "date-DESC" ? styles.active : ""}
      >
        Newest
      </button>
      <button
        onClick={() => handleSortChange("reviews")}
        className={activeButton === "reviews-DESC" ? styles.active : ""}
      >
        Popular
      </button>
      <button
        onClick={() => handleSortChange("date", "ASC")}
        className={activeButton === "date-ASC" ? styles.active : ""}
      >
        Oldest
      </button>
      <button
        onClick={() => handleSortChange("rating")}
        className={activeButton === "rating-DESC" ? styles.active : ""}
      >
        Highest-rated
      </button>
      <CategoryTags categories={categories} onCategoryClick={handleCategoryChange} />
    </div>
  );
}

export default SortMenu;
