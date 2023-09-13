// ReviewsContainer.js

import React,{useState} from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import AddReview from './AddReview'
import EditReview from './EditReview'

import classes from "./Reviews.module.css";
import { Link } from "react-router-dom";
import {  decodeToken } from "react-jwt";
import { getAuthToken } from "../../../../utils/auth";
import MessageModal from "../../../../ui/MessageModal/MessageModal";

const userAlreadyReviewed = (reviews, userEmail) => reviews.find(review => review.user.email === userEmail);

const Reviews = (props) => {
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "success" or "error"
  const [message, setMessage] = useState("");
  const [starsKey, setStarsKey] = useState(Math.random());
  const handleRefresh = () => {
    setStarsKey(Math.random());
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (method) =>{
    // method -> DELETE, PUT, POST, ERROR )
   
    let errorMess = "An error occurred! Try again later."
    switch(method){
      case "DELETE": 
        setMessage("Review deleted successfully!");
        setModalType("success");
        break;
      case "PUT":
        setMessage("Review updated successfully!");
        setModalType("success");
        handleRefresh();
        break;
      case "POST":
        setMessage("Review added successfully!");
        setModalType("success");
        break;
      default:
        setMessage(errorMess);
        setModalType("error");
        break;
    }
    setShowModal(true);
  }

  const reviews = props.reviews;
  let token = getAuthToken();
  token = token === "EXPIRED" ? null : token;
  let email = decodeToken(token)?.email;
  const userReview = userAlreadyReviewed(reviews, email);

  let content = null;
  if(!userReview){
    content = <AddReview onShowModal={openModal}  />;
  }
  else{
    console.log(userReview)
    content = <EditReview review={userReview} onShowModal={openModal} />;
  }

  return (
    <div className={classes.container}>
      {showModal && (
        <MessageModal type={modalType} message={message} onClose={closeModal} />
      )}
      <h2 className={classes.title}>Reviews</h2>
      
      {token && !props.isOwner && content}
      {!token && (
        <h4>
          {" "}
          <Link to="/auth/login" className={classes.h4}>
            Log in to leave a review!
          </Link>
        </h4>
      )}
      <div className={classes.content}>
        {reviews.map((review, index) => (
          <Review
            key={index}
            id={review.id}
            content={review.content}
            rating={review.rating}
            thumbsUp={review.upvotes}
            thumbsDown={review.downvotes}
            author={review.user.name + " " + review.user.surname}
            date={review.created}
            starsKey={starsKey}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
