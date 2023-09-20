// ProfileArticle.jsx

import styles from './ProfileArticle.module.css';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import {formatShortMonthDate} from '../../../utils/date-conventer';
const ProfileArticle = React.forwardRef(({article}, ref) => {
    const navigate = useNavigate();

    const truncate = (description, wordCount=20) => {
        const words = description.split(' ');
        if (words.length <= wordCount) return description;
        return words.slice(0, wordCount).join(' ') + '...';
    };

    const handleArticleClick = () => {
        navigate(`/articles/${article.id}`);
    };

    return (
        <div ref={ref} className={styles.article} onClick={handleArticleClick}>
            <img src={article.imgUrl} alt={article.title} className={styles.articleImage} />
            <div className={styles.articleInfo}>
                <h2 className={styles.articleTitle}>{truncate(article.title, 6)}</h2>
                <p className={styles.articleDescription}>
                    {truncate(article.description)}
                </p>
                <div className={styles.articleFooter}>
                    <div className={styles.articleRating}>
                        {article.rating} ⭐
                    </div>
                    <div className={styles.articleReviews}>
                        {article.reviewsCount} {article.reviewsCount === 1 ? "review" : "reviews"}
                    </div>
                    <div className={styles.articleDate}>
                        {formatShortMonthDate(article.date)} {/* Assuming article.date is in a standard format */}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfileArticle;
