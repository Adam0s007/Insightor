// ProfileArticle.jsx

import styles from './ProfileArticle.module.css';
import {useNavigate} from 'react-router-dom';
import React from 'react'
const ProfileArticle = React.forwardRef(({article},ref) => {
    const navigate = useNavigate();

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length <= 20) return description;
        return words.slice(0, 20).join(' ') + '...';
    };

    const handleArticleClick = () => {
        navigate(`/articles/${article.id}`);
    };

    return (
        <div ref={ref} className={styles.article} onClick={handleArticleClick}>
            <img src={article.imgUrl} alt={article.title} className={styles.articleImage} />
            <div className={styles.articleInfo}>
                <h2 className={styles.articleTitle}>{article.title}</h2>
                <p className={styles.articleDescription}>
                    {truncateDescription(article.description)}
                </p>
                <div className={styles.articleFooter}>
                    <div className={styles.articleRating}>
                        {article.rating} ⭐
                    </div>
                    <div className={styles.articleReviews}>
                        {article.reviewsCount} reviews
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfileArticle;
