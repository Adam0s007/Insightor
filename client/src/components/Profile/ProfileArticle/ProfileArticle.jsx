import React from "react";
import styles from "./ProfileArticle.module.css";
import { useNavigate } from "react-router-dom";
import { formatShortMonthDate } from "../../../utils/date-conventer";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const ProfileArticle = React.forwardRef(
  ({ article, isOwner, onDelete }, ref) => {
    const navigate = useNavigate();

    const truncate = (description, wordCount = 20) => {
      const words = description.split(" ");
      if (words.length <= wordCount) return description;
      return words.slice(0, wordCount).join(" ") + "...";
    };

    const handleArticleClick = () => {
      navigate(`/articles/${article.id}`);
    };
    const handleEditClick = () => {
      navigate(`/articles/${article.id}/edit`);
    };

    const handleDeleteArticle = () => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            onDelete(article.id);
          }
    };

    return (
      <div ref={ref} className={styles.article} onClick={handleArticleClick}>
        {isOwner && (
          <div className={styles.articleButtons}>
            <button
              className={`${styles.articleButton} ${styles.editButton}`}
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick();
              }}
            >
              <FaEdit /> Edit
            </button>
            <button
              className={`${styles.articleButton} ${styles.deleteButton}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteArticle();
              }}
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
        <img
          src={article.imgUrl}
          alt={article.title}
          className={styles.articleImage}
        />
        <div className={styles.articleInfo}>
          <h2 className={styles.articleTitle}>{truncate(article.title, 6)}</h2>
          <p className={styles.articleDescription}>
            {truncate(article.description)}
          </p>
          <div className={styles.articleFooter}>
            <div className={styles.articleRating}>{article.rating} ⭐</div>
            <div className={styles.articleReviews}>
              {article.reviewsCount}{" "}
              {article.reviewsCount === 1 ? "review" : "reviews"}
            </div>
            <div className={styles.articleDate}>
              {formatShortMonthDate(article.date)}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ProfileArticle;
