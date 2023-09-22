import styles from './Tag.module.css'
import React, { useState } from 'react';

export const CategoryTag = (props) => (
  <div
    className={`${styles.categoryTag} ${props.isActive ? styles.active : ''}`}
    onClick={() => props.onClick(props.label)}
  >
    {props.label}
  </div>
);

export const CategoryTags = (props) => {
  const [activeTag, setActiveTag] = useState(null);

  const handleTagClick = (category) => {
    setActiveTag(category);  // ustawienie aktywnego tagu
    if(props.onCategoryClick){
      props.onCategoryClick(category);
    }
  };

  return (
    <div className={styles.categoryTagsContainer}>
      <CategoryTag label="All categories" onClick={handleTagClick} isActive={activeTag === "All categories"} />
      {props.categories && props.categories.map((category) => (
        <CategoryTag key={category} label={category} onClick={handleTagClick} isActive={activeTag === category} />
      ))}
    </div>
  );
};

  

  
  