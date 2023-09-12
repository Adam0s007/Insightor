import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { useMutation } from "@tanstack/react-query";
import LoadingOverlay from "../../../../ui/LoadingOverlay/LoadingOverlay";
import MessageModal from "../../../../ui/MessageModal/MessageModal";
import styles from "./ReviewForm.module.css";
import { reviewAction, queryClient } from "../../../../utils/http";
import { useParams } from "react-router-dom";

const EditReview = (props) => {
  const review = props.review;
  const params = useParams();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "success" or "error"
  const [message, setMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: reviewAction,
    onMutate: async (data) => {
      const newReview = data.review;
      await queryClient.cancelQueries(["reviews", params.articleId]);
      const previousReviews = queryClient.getQueryData([
        "reviews",
        params.articleId,
      ]);
      queryClient.setQueryData(["reviews", params.articleId], newReview);
      return { previousReviews };
    },
    onError: (err, daya, context) => {
      queryClient.setQueryData(
        ["reviews", params.articleId],
        context.previousReviews
      );
      setMessage("An error occurred! Try again later.");
      setModalType("error");
      setShowModal(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["reviews", params.articleId]);
    },
    onSuccess: (data) => {
      console.log(data);
      setMessage("Review updated successfully!");
      setModalType("success");
      setShowModal(true);
    },
  });

  const closeModal = () => {
    setShowModal(false);
  };

  function submitHandler(review) {
    mutate({ articleId: params.articleId, reviewData: review, method: "PUT" }); //this object is going to onMutate too
  }

  function deleteHandler() {
    mutate({
      articleId: params.articleId,
      reviewData: review,
      method: "DELETE",
    });
  }
  return (
    <div className={styles.container}>
      {showModal && (
        <MessageModal type={modalType} message={message} onClose={closeModal} />
      )}
      {isPending && <LoadingOverlay />}
        <ReviewForm
          data={review}
          type="update"
          onSubmit={submitHandler}
          onDelete={deleteHandler}
        />
      
    </div>
  );
};

export default EditReview;
