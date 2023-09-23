import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import classes from "./Review.module.css";
import { TimeAgo } from "../../../../utils/time-ago";
import { getRatingLabel } from "../../../../utils/rating";
import { hexToRgba } from "../../../../utils/color-converter";
import {useMutation} from '@tanstack/react-query'
import { voteAction,queryClient } from "../../../../utils/http";
import defaultProfileImage from "../../../../assets/images/profilePicture.png"
import { url } from "../../../../utils/pictures";
import { Link } from "react-router-dom";
const Review = (props) => {
  const ratingLabel = getRatingLabel(props.rating);
  const color = hexToRgba(ratingLabel.color, 0.2);
  const bgColor = hexToRgba(ratingLabel.color, 0.08);
  
  const {mutate} = useMutation({
    mutationFn: voteAction,
    onMutate: async (data) => {
      await queryClient.cancelQueries(["reviews", props.id]);
      const previousReviews = queryClient.getQueryData([
        "reviews",
        props.id,
      ]);
      queryClient.setQueryData(["reviews", props.id], data.review);
      return { previousReviews };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["reviews", props.id], context.previousReviews);
      onShowModal("ERROR");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["reviews", props.id]);
    },
  })
  const thumbsHandler = (type) => {
    if(props.token){
      mutate({reviewId: props.id,action: type })
    }
    
}
  
  return (
    <div className={classes.reviewContainer} style={{ background: bgColor }}>
      <div className={classes.authorInfo}>
        
        <Link to={"/user/"+props.userId} className={classes.imageContainer}>
          <img
            className={classes.authorImage}
            src={props.imgUrl ? url +props.imgUrl : defaultProfileImage}
            alt={props.author}
          />
        </Link>

        <span className={classes.authorName}>{props.author}</span>
        <span className={classes.reviewDate}>
          <TimeAgo date={props.date} />
        </span>
      </div>
      <div className={classes.content}>{props.content}</div>
      <div className={classes.reviewFooter}>
        <div className={classes.ratingContainer}>
          <ReactStars
            key={props.rating}
            count={5}
            value={props.rating ? props.rating : 0}
            edit={false}
            isHalf={true}
            size={20}
            activeColor="#ffd700"
          />
          <span
            className={classes.ratingLabel}
            style={{
              color: `${ratingLabel.color}`,
              backgroundColor: color,
              outline: `2px solid ${ratingLabel.color}`,
            }}
          >
            {ratingLabel.label}
          </span>
        </div>
        <div className={classes.thumbs}>
        <span 
          className={`${classes.thumbsItem} ${props.isUpvoted ? classes.thumbsUpSelected : ""}`} 
          onClick={() => thumbsHandler("upvote")}
        >
          <FaThumbsUp /> {props.upvotes}
        </span>
        <span 
          className={`${classes.thumbsItem} ${props.isDownvoted ? classes.thumbsDownSelected : ""}`} 
          onClick={() => thumbsHandler("downvote")}
        >
          <FaThumbsDown /> {props.downvotes}
        </span>
      </div>
      </div>
    </div>
  );
};

export default Review;
