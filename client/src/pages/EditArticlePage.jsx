import React from "react";
import ArticleForm from "../components/Articles/NewArticle/ArticleForm";
import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../utils/http";
import LoadingIndicator from "../../../ui/LoadingIndicator/LoadingIndicator.jsx";
import { useParams } from "react-router-dom";

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
