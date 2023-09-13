// hooks/useReviewMutation.js
import { useMutation } from "@tanstack/react-query";
import { reviewAction, queryClient } from "../utils/http";

export const useReviewMutation = (articleId, onShowModal) => {
  const { mutate, isPending } = useMutation({
    mutationFn: reviewAction,
    onMutate: async (data) => {
      await queryClient.cancelQueries(["reviews", articleId]);
      const previousReviews = queryClient.getQueryData([
        "reviews",
        articleId,
      ]);
      queryClient.setQueryData(["reviews", articleId], data.review);
      return { previousReviews };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["reviews", articleId], context.previousReviews);
      onShowModal("ERROR");
    },
    onSettled: () => {
      //queryClient.invalidateQueries(["reviews", articleId]);
    },
  });

  return {
    mutateReview: mutate,
    isPending,
  };
};
