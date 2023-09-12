import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import AutoExpandTextArea from "../../../../ui/AutoExpandTextArea";
import styles from "./ReviewForm.module.css";

const ReviewForm = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  const [review, setReview] = useState({
    content: "",
    rating: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(review);
  };

  const formStyle = showDetails ? styles.formShow : styles.formHide;

  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${formStyle}`}>
      <div
        className={styles.toggleIcon}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "▲" : "▼"}
      </div>
      <h2>Submit Your Review</h2>

      <div className={styles.rating}>
        <p className={styles.p}>Rate</p>
        <ReactStars
          count={5}
          size={22}
          value={review.rating ? review.rating : 0}
          edit={true}
          isHalf={true}
          activeColor="#ffd700"
        />
      </div>
      <AutoExpandTextArea
        placeholder="Your review"
        value={review.content}
        className={styles.textarea}
        onChange={(e) =>
          setReview((prev) => ({ ...prev, content: e.target.value }))
        }
      />

      <button className={styles.button} type="button">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
