import ArticleForm from "../components/Articles/NewArticle/ArticleForm";
import { useMutation } from "@tanstack/react-query";
import { createNewArticle, queryClient } from "../utils/http";
import { useNavigate } from "react-router-dom";

import styles from "../components/Articles/NewArticle/ArticleForm.module.css";
import LoadingIndicator from "../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../ui/ErrorContainer/ErrorContainer";

const NewArticlePage = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      navigate("/articles");
    },
  });

  function handleSubmit(article) {
    //console.log(article);
    mutate({ articleData: article });
  }
  const tryAgainHandler = () => {
    window.location.reload();
  };
  console.log(isError);
  return (
    <div className={styles.container}>
      {isPending && <LoadingIndicator />}
      {isError && (
        <ErrorContainer
          title="An error occured!"
          message={error.message}
          onTryAgain={tryAgainHandler}
          navigateMessage="try again"
        />
      )}
      <ArticleForm onSubmit={handleSubmit} type="new" />
    </div>
  );
};

export default NewArticlePage;
