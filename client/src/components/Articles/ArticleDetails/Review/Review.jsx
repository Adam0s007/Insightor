import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import classes from "./Review.module.css";
import { TimeAgo } from "../../../../utils/time-ago";
import { getRatingLabel } from "../../../../utils/rating";
import { hexToRgba } from "../../../../utils/color-converter";

const Review = (props) => {
  const ratingLabel = getRatingLabel(props.rating);
  const color = hexToRgba(ratingLabel.color, 0.2);
  const bgColor = hexToRgba(ratingLabel.color, 0.08);
  
  
  return (
    <div className={classes.reviewContainer} style={{background:bgColor}} >
      <div className={classes.authorInfo}>
        <div className={classes.imageContainer}>
          <img
            className={classes.authorImage}
            src={props.imgUrl ?? "https://picsum.photos/200/200?random=1"}
            alt={props.author}
          />
        </div>
        
          <span className={classes.authorName}>{props.author}</span>
          <span className={classes.reviewDate}>
          <TimeAgo date={props.date} />
          </span>
       
      </div>
      <div className={classes.content}>{props.content}</div>
      <div className={classes.reviewFooter}>
        <div className={classes.ratingContainer}>
        <ReactStars
          key={props.starsKey}
          count={5}
          value={props.rating ? props.rating : 0}
          edit={false}
          isHalf={true}
          size={20}
          activeColor="#ffd700"
        />
        <span className={classes.ratingLabel} style={{ color:`${ratingLabel.color}`,backgroundColor: color, 'outline':`2px solid ${ratingLabel.color}` }}>{ratingLabel.label}</span>
        </div>
        <div className={classes.thumbs}>
          <FaThumbsUp color="#4CAF50" /> {props.thumbsUp ?? 0}
          <FaThumbsDown color="#F44336" /> {props.thumbsDown ?? 0}
        </div>
      </div>
    </div>
  );
};

export default Review;
