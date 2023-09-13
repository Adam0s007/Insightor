import React,{useState} from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import classes from "./Review.module.css";
import { TimeAgo } from "../../../../utils/time-ago";
import { getRatingLabel } from "../../../../utils/rating";
import { hexToRgba } from "../../../../utils/color-converter";
import {useMutation} from '@tanstack/react-query'
import { voteAction } from "../../../../utils/http";
const Review = (props) => {
  const ratingLabel = getRatingLabel(props.rating);
  const color = hexToRgba(ratingLabel.color, 0.2);
  const bgColor = hexToRgba(ratingLabel.color, 0.08);
  
  const [vote,setVote] = useState({
    upvoted: props.upvoted,//gdy tam wczesniej kliknał
    downvoted: props.downvoted, //gdy tam wczesniej kliknął
    upvote: props.upvotes,//calkowita ilosc upvote
    downvote: props.downvotes//calkowita ilosc downvote
  });

  const {mutate} = useMutation({
    mutationFn: voteAction,
  })
  const thumbsHandler = (type) => {
    if(props.upvoted === undefined || props.downvoted === undefined){
      return;
    }
  if(type === "up"){
    mutate({reviewId: props.id,action: "upvote" })
    if(vote.upvoted){
      setVote(prevVote => ({...prevVote, upvote: prevVote.upvote - 1, upvoted: false}));
    } else {
      if(vote.downvoted){
        setVote(prevVote => ({...prevVote, upvote: prevVote.upvote + 1, downvote: prevVote.downvote - 1, upvoted: true, downvoted: false}));
      } else {
        setVote(prevVote => ({...prevVote, upvote: prevVote.upvote + 1, upvoted: true}));
      }
    }
  }else if(type === "down"){
    mutate({reviewId: props.id,action: "downvote"})
    if(vote.downvoted){
      setVote(prevVote => ({...prevVote, downvote: prevVote.downvote - 1, downvoted: false}));
    } else {
      if(vote.upvoted){
        setVote(prevVote => ({...prevVote, downvote: prevVote.downvote + 1, upvote: prevVote.upvote - 1, downvoted: true, upvoted: false}));
      } else {
        setVote(prevVote => ({...prevVote, downvote: prevVote.downvote + 1, downvoted: true}));
      }
    }
  }
}
  
  return (
    <div className={classes.reviewContainer} style={{ background: bgColor }}>
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
          <span className={classes.thumbsItem} onClick={()=>thumbsHandler("up")}>
            <FaThumbsUp color="#4CAF50" /> {vote.upvote}
          </span>
          <span className={classes.thumbsItem} onClick={()=>thumbsHandler("down")}>
            <FaThumbsDown color="#F44336" /> {vote.downvote}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Review;
