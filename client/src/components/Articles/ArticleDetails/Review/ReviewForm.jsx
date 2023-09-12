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
  const clickOnFormHandler = () => {
    if(showDetails) return;
    setShowDetails(!showDetails);
  };
  return (
    <form onSubmit={handleSubmit} className={`${styles.form} ${formStyle}`} onClick={clickOnFormHandler}>
      <div
        className={styles.toggleIcon}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "▲" : "▼"}
      </div>
      <h2>{props.type === "add" ? "Submit your review" : "Update your review"}</h2>

      <div className={styles.rating}>
        <p className={styles.p}>Rate</p>
        <ReactStars
          count={5}
          size={22}
          defaultValue={review.rating ?? 0}
          edit={true}
          isHalf={true}
          activeColor="#ffd700"
        />
      </div>
      <AutoExpandTextArea
        placeholder="Your review"
        defaultValue={review.content ?? ""}
        className={styles.textarea}
        onChange={(e) =>
          setReview((prev) => ({ ...prev, content: e.target.value }))
        }
      />

      <button className={styles.button} type="button">
      {props.type === "add" ? "Submit review" : "update review"}
      </button>
    </form>
  );
};

export default ReviewForm;
