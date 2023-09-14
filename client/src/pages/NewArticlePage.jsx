import ArticleForm from "../components/Articles/ArticleForm/ArticleForm";
import { useMutation } from "@tanstack/react-query";
import { createNewArticle, queryClient } from "../utils/http";
import { useNavigate } from "react-router-dom";

import styles from "../components/Articles/ArticleForm/ArticleForm.module.css";
import LoadingOverlay from "../ui/LoadingOverlay/LoadingOverlay";
import ErrorContainer from "../ui/ErrorContainer/ErrorContainer";
import { useState } from "react";

const NewArticlePage = () => {
  const navigate = useNavigate();
  const [openErrorModal,setOpenErrorModal] = useState(false);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      navigate("/articles/" + data.id);
    },
  });

  function handleSubmit(article) {
    setOpenErrorModal(true);
    mutate({ articleData: article });
  }
  
  const tryAgainHandler = () => {
    setOpenErrorModal(false)
  };
  
  return (
    <div className={styles.container}>
      {isPending && <LoadingOverlay />}
      {(isError && openErrorModal)  && (
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
