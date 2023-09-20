import { getSimpleToken } from "../../../utils/auth.js";
import { useCallback, useState, useRef,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchArticles } from "../../../hooks/use-fetch-articles";
import styles from "./ProfileArticles.module.css";
import ProfileArticle from "../ProfileArticle/ProfileArticle";
import LoadingIndicator from '../../../ui/LoadingIndicator/LoadingIndicator.jsx'
import LoadingOverlay from '../../../ui/LoadingOverlay/LoadingOverlay.jsx'
import { decodeToken } from "react-jwt";
import ErrorContainer from "../../../ui/ErrorContainer/ErrorContainer.jsx";
import { deleteArticle,queryClient } from "../../../utils/http";
import { useMutation } from "@tanstack/react-query";
const ProfileArticles = () => {
  let token = getSimpleToken();
  const params = useParams();
  const [activeButton, setActiveButton] = useState("date-DESC");
  const [localArticles, setLocalArticles] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({
    sort: "date",
    order: "DESC",
  });
  let userId = "";
  if (token) {
    userId = decodeToken(token).id;
  }
  let isOwner = false;
  let endPoint = "/user/" + params.userId;
  if (userId === params.userId) {
    isOwner = true;
  }
  
  const { isPending, error, articles, hasMore } = useFetchArticles({
    pageNumber,
    filters,
    user: endPoint
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

  const handleSortChange = (sortBy, type = "DESC") => {
    const sortValue = `${sortBy}-${type}`;
    setActiveButton(sortValue);
    setFilters({
      ...filters,
      sort: sortBy,
      order: type,
    });
    setPageNumber(1); // Reset page number on sort change
  };

  useEffect(() => {
    setLocalArticles(articles);
  }, [articles]);
  
  
    
  
  const { mutate } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });

  const handleDeleteArticle = (articleId) => {
    mutate({ id:articleId });
    setLocalArticles(prevArticles => prevArticles.filter(article => article.id !== articleId));
  };
  
  
  return (
    <section className={styles.articlesContainer}>
      
      <div className={styles.menu}>
        {isPending && <LoadingOverlay />}
        <button
          onClick={() => handleSortChange("date")}
          className={activeButton === "date-DESC" ? styles.active : ""}
        >
          Newest
        </button>
        <button
          onClick={() => handleSortChange("reviews")}
          className={activeButton === "reviews-DESC" ? styles.active : ""}
        >
          Popular
        </button>
        <button
          onClick={() => handleSortChange("date", "ASC")}
          className={activeButton === "date-ASC" ? styles.active : ""}
        >
          Oldest
        </button>
        <button
          onClick={() => handleSortChange("rating")}
          className={activeButton === "rating-DESC" ? styles.active : ""}
        >
          Highest-rated
        </button>
      </div>

      <div className={styles.articles}>
        {localArticles  &&
          localArticles.map((article, index) => {
            const isLastElement = localArticles.length === index + 1;
            return (
              <ProfileArticle
                article={article}
                isOwner={isOwner}
                key={article.id}
                onDelete={handleDeleteArticle}
                ref={isLastElement ? lastArticleElementRef : null}
              />
            );
          })}
        {isPending && <LoadingIndicator />}
        {error && <ErrorContainer message={error.message} />}
      </div>
    </section>
  );
};

export default ProfileArticles;
