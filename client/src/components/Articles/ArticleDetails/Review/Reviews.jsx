// ReviewsContainer.js

import React,{useState} from "react";
import Review from "./Review";
import AddReview from './AddReview'
import EditReview from './EditReview'

import classes from "./Reviews.module.css";
import { Link } from "react-router-dom";
import {  decodeToken } from "react-jwt";
import {getSimpleToken } from "../../../../utils/auth";
import MessageModal from "../../../../ui/MessageModal/MessageModal";

const userAlreadyReviewed = (reviews, userEmail) => reviews.find(review => review.user.email === userEmail);

const Reviews = (props) => {
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "success" or "error"
  const [message, setMessage] = useState("");
 
  

  const reviews = props.reviews
  
  let token = getSimpleToken();
  let user = null;
  let email = null;
  if(token){
    user = decodeToken(token);
    email = user.email;
  }
  const userReview = userAlreadyReviewed(reviews, email);
  
  


  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (method) =>{
    // method -> DELETE, PUT, POST, ERROR )
   console.log(method)
    let errorMess = "An error occurred! Try again later."
    switch(method){
      case "DELETE": 
        setMessage("Review deleted successfully!");
        setModalType("success");
        break;
      case "PUT":
        setMessage("Review updated successfully!");
        setModalType("success");
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
        <MessageModal type={modalType} message={message} onClose={closeModal}  />
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
            upvotes={review.upvotes}
            downvotes={review.downvotes}
            author={review.user.name + " " + review.user.surname}
            date={review.created}
            token={token}
           
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
