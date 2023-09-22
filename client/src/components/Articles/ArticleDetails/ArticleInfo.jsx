import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { formatShortMonthDate } from '../../../utils/date-conventer';
import styles from './ArticleDetails.module.css';

const ArticleInfo = ({ user, date, readingTime, categories }) => {
  const personName = `${user?.name} ${user?.surname}` ?? "Unknown Person";
  const formattedDate = formatShortMonthDate(date ?? "");

  return (
    <div className={styles.postInfo}>
      <Link to={`/user/${user.id}`}>
        <span><FaUser className={styles.icon} /> {personName}</span>
      </Link>
      <span><FaCalendarAlt className={styles.icon} /> {formattedDate}</span>
      <span><FaClock className={styles.icon} /> {readingTime} of reading</span>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <span key={category.id} className={styles.categoryTag}>
            {category.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ArticleInfo;
