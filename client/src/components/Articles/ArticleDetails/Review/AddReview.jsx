import ReviewForm from "./ReviewForm";
import { useMutation } from "@tanstack/react-query";
import LoadingOverlay from "../../../../ui/LoadingOverlay/LoadingOverlay";
import styles from "./ReviewForm.module.css";
import { reviewAction, queryClient } from "../../../../utils/http";
import { useParams } from "react-router-dom";

const EditReview = (props) => {
  const params = useParams();

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
    onError: (err, data, context) => {
      queryClient.setQueryData(
        ["reviews", params.articleId],
        context.previousReviews
      );
      props.onShowModal("ERROR");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["reviews", params.articleId]);
    },
  });

  function addHandler(review) {
    mutate(
      { articleId: params.articleId, 
        reviewData: review, 
        method: "POST" },
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

export default EditReview;
