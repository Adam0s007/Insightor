import { useState } from 'react';
import styles from './SortingFilter.module.css';

const SortingFilter = (props) => {
  const sortOptions = [
    { label: 'Newest', sort: 'date', order: 'DESC' },
    { label: 'Oldest', sort: 'date', order: 'ASC' },
    { label: 'Popular', sort: 'reviews', order: 'DESC' },
    { label: 'Highest-rated', sort: 'rating', order: 'DESC' },
  ];

  const [activeSort, setActiveSort] = useState(null);

  const handleSortChange = (option) => {
    setActiveSort(option.label); // Ustaw aktywny sort
    props.onFiltersSubmit({ sort: option.sort, order: option.order});
  };

  return (
    <div className={styles.container}>
      {sortOptions.map((option) => (
        <button
          key={option.label}
          className={`${styles.button} ${activeSort === option.label ? styles.active : ''}`}
          onClick={() => handleSortChange(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortingFilter;
