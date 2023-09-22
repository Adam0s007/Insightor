import styles from './Tag.module.css'
import React, { useState } from 'react';

export const CategoryTag = ({ label, onClick, isActive }) => (
  <div
    className={`${styles.categoryTag} ${isActive ? styles.active : ''}`}
    onClick={() => onClick(label)}
  >
    {label}
  </div>
);

export const CategoryTags = ({ categories, onCategoryClick }) => {
  const [activeTag, setActiveTag] = useState(null);

  const handleTagClick = (category) => {
    setActiveTag(category);  // ustawienie aktywnego tagu
    onCategoryClick(category);
  };

  return (
    <div className={styles.categoryTagsContainer}>
      <CategoryTag label="All categories" onClick={handleTagClick} isActive={activeTag === "All categories"} />
      {categories && categories.map((category) => (
        <CategoryTag key={category} label={category} onClick={handleTagClick} isActive={activeTag === category} />
      ))}
    </div>
  );
};

  

  
  