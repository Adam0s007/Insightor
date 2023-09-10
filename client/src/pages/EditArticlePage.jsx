import ArticleForm from "../components/Articles/NewArticle/ArticleForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  queryClient, fetchArticle,updateArticle} from "../utils/http";
import {  useParams,useNavigate } from "react-router-dom";

import styles from "../components/Articles/NewArticle/ArticleForm.module.css";
import LoadingOverlay from "../ui/LoadingOverlay/LoadingOverlay";
import ErrorContainer from "../ui/ErrorContainer/ErrorContainer";
import { useState } from "react";

const EditArticlePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["article", params.articleId],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.articleId }),
  });

  
  const { mutate } = useMutation({
    mutationFn: updateArticle,
    onMutate: async (data) => {
      const newArticle = data.article;
    
      await queryClient.cancelQueries({ queryKey: ["articles", params.articleId] }); 
      
      const previousArticle = queryClient.getQueryData(["articles", params.articleId]);
      queryClient.setQueryData(["articles", params.articleId], newArticle);
      return { previousArticle };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["articles", params.articleId], context.previousArticle);
    },
    onSettled: () => {
     
      queryClient.invalidateQueries(["articles", params.articleId]);
    },
  });


  
  function handleSubmit(article) {
    setOpenErrorModal(true);
    mutate({ id: params.articleId, article }); //this object is going to onMutate too
    navigate('../');
  }

  const tryAgainHandler = () => {
    setOpenErrorModal(false);
  };
  
  let content = null;
  if (data) {
    content = <ArticleForm data={data} onSubmit={handleSubmit} type="edit" />;
  }

  if (isPending) {
    content = <LoadingOverlay />;
  }

  if (isError && openErrorModal) {
    content = (
      <ErrorContainer
          title="An error occured!"
          message={error.message}
          onTryAgain={tryAgainHandler}
          navigateMessage="try again"
        />
    )
  }




  return (
    <div className={styles.container}>
      {content}
    </div>
  );
};

export default EditArticlePage;
