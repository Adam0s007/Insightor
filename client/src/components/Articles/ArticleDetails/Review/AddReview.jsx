import ReviewForm from "./ReviewForm";

import LoadingOverlay from "../../../../ui/LoadingOverlay/LoadingOverlay";
import styles from "./ReviewForm.module.css";

import { useParams } from "react-router-dom";
import { useReviewMutation } from "../../../../hooks/use-review-mutation";
const AddReview = (props) => {
  const params = useParams();
  const { mutateReview, isPending } = useReviewMutation(params.articleId, props.onShowModal);

  function addHandler(review) {
    mutateReview(
      { articleId: params.articleId, reviewData: review, method: "POST" },
      {
        onSuccess: () => {
          props.onShowModal("POST");
        },
      }
    );
  }

  return (
    <div className={styles.container}>
      {isPending && <LoadingOverlay />}
      <ReviewForm type="add" onSubmit={addHandler} />
    </div>
  );
};

export default AddReview;