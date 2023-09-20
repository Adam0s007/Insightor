import { getSimpleToken } from "../utils/auth.js";
import { useCallback, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetchArticles } from "../hooks/use-fetch-articles";
import LoadingIndicator from "../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../ui/ErrorContainer/ErrorContainer";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../utils/http";

import ProfileArticle from "../components/Profile/ProfileArticle/ProfileArticle";
const ProfileArticlesPage = () => {
  let token = getSimpleToken();
  const params = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({
    sort: "date",
    order: "DESC",
  });
  let endPoint = "/user/" + params.userId;
  const { isPending, error, articles, hasMore } = useFetchArticles({
    pageNumber,
    filters,
    user: endPoint,
  });
  const observer = useRef();
  const lastArticleElementRef = useCallback(
    (node) => {
      if (isPending) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isPending, hasMore]
  );
  const filtersSubmitHandler = () => {
    setPageNumber(1);
  };
  return (
    <div>
      <h1>Profile Articles Page</h1>
      {articles &&
        articles.map((article, index) => {
          const isLastElement = articles.length === index + 1;
          return (
            <ProfileArticle
              article={article}
              key={article.id}
              ref={isLastElement ? lastArticleElementRef : null}
            />
          );
        })}
    </div>
  );
};

export default ProfileArticlesPage;
