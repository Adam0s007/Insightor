import ArticleForm from "../components/Articles/NewArticle/ArticleForm";
import { useMutation,useQuery } from "@tanstack/react-query";
import { updateArticle, queryClient } from "../utils/http";
import { useNavigate } from "react-router-dom";

import styles from "../components/Articles/NewArticle/ArticleForm.module.css";
import LoadingOverlay from "../ui/LoadingOverlay/LoadingOverlay";
import ErrorContainer from "../ui/ErrorContainer/ErrorContainer";
import { useState } from "react";

const EditArticlePage = () => {
  const params = useParams();

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", params.articleId],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.articleId }),
  });

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <div>Error loading article!</div>;

  return <ArticleForm data={article} />;
};

export default EditArticlePage;
