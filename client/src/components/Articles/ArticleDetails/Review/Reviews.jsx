import React, { useState } from "react";
import Review from "./Review";
import AddReview from './AddReview'
import EditReview from './EditReview'
import classes from "./Reviews.module.css";
import { Link } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { getSimpleToken } from "../../../../utils/auth";
import MessageModal from "../../../../ui/MessageModal/MessageModal";
import { getModalMessage } from './ModalLogic';

const userAlreadyReviewed = (reviews, userEmail) => reviews.find(review => review.user.email === userEmail);

const Reviews = (props) => {
    const [modalObject, setModalObject] = useState({
      modalType: null,
      message: "",
      showModal: false
    });

    const reviews = props.reviews;
    let token = getSimpleToken();
    let user = token ? decodeToken(token) : null;
    const userReview = user ? userAlreadyReviewed(reviews, user.email) : null;

    const closeModal = () => {
        setModalObject(prevState => ({ ...prevState, showModal: false }));
    };

    const openModal = (method,message="An error occurred! Try again later.",type="error") => {
        const modalData = getModalMessage(method,message,type);
        setModalObject({
          modalType: modalData.type,
          message: modalData.message,
          showModal: true
        });
    }

    let content = userReview
        ? <EditReview review={userReview} onShowModal={openModal} />
        : <AddReview onShowModal={openModal} />;

    return (
        <div className={classes.container}>
            {modalObject.showModal && (
                <MessageModal type={modalObject.modalType} message={modalObject.message} onClose={closeModal} />
            )}
            <h2 className={classes.title}>Reviews</h2>

            {token && !props.isOwner && content}
            {!token && (
                <h4>
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
