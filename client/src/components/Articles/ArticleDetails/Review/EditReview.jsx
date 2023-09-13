import ReviewForm from "./ReviewForm";

import LoadingOverlay from "../../../../ui/LoadingOverlay/LoadingOverlay";
import styles from "./ReviewForm.module.css";
import { useReviewMutation } from "../../../../hooks/use-review-mutation";
import { useParams } from "react-router-dom";

const EditReview = (props) => {
  const review = props.review;
  const params = useParams();
  const { mutateReview, isPending } = useReviewMutation(params.articleId, props.onShowModal);

  function submitHandler(updatedReview) {
    mutateReview(
      { articleId: params.articleId, reviewData: updatedReview, method: "PUT" },
      {
        onSuccess: () => {
          props.onShowModal("PUT");
        },
      }
    );
  }

  function deleteHandler() {
    mutateReview(
      { articleId: params.articleId, reviewData: review, method: "DELETE" },
      {
        onSuccess: () => {
          props.onShowModal("DELETE");
        },
      }
    );
  }

  return (
    <div className={styles.container}>
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