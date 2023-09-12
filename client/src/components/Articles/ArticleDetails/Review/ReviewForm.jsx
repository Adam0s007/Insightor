import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import AutoExpandTextArea from "../../../../ui/AutoExpandTextArea";
import styles from "./ReviewForm.module.css";

const ReviewForm = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  
  let initialState ={content:"", rating:0} 
  if(props.type === "update"){
    initialState = {...props.data}
  }

  const [review, setReview] = useState(initialState); 

  const formStyle = showDetails ? styles.formShow : styles.formHide;
  
  const clickOnFormHandler = () => {
    if (showDetails) return;
    setShowDetails(!showDetails);
  };
  
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      props.onDelete();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(review);
    
  };

  return (
    <form
    onSubmit={handleSubmit}  
    className={`${styles.form} ${formStyle}`}
      onClick={clickOnFormHandler}
    >
      <div
        className={styles.toggleIcon}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "▲" : "▼"}
      </div>
      <h2>
        {props.type === "add" ? "Submit your review" : "Update your review"}
      </h2>

      <div className={styles.rating}>
        <p className={styles.p}>Rate</p>
        <ReactStars
          count={5}
          size={22}
          value={review.rating ?? 0} 
          edit={true}
          isHalf={true}
          activeColor="#ffd700"
          onChange={(newRating) =>
            setReview((prev) => ({ ...prev, rating: newRating }))
          } 
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

      <div className={styles.buttons}>
        <button className={styles.button} type="submit">
          {props.type === "add" ? "Submit review" : "update review"}
        </button>
        {props.type === "update" && (
          <button
            className={styles.deleteButton}
            type="button"
            onClick={handleDelete}
          >
            Delete review
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
