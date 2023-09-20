import { getSimpleToken } from "../../../utils/auth.js";
import { useCallback, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFetchArticles } from "../../../hooks/use-fetch-articles";
import styles from "./ProfileArticles.module.css";
import ProfileArticle from "../ProfileArticle/ProfileArticle";
import LoadingIndicator from '../../../ui/LoadingIndicator/LoadingIndicator.jsx'
import LoadingOverlay from '../../../ui/LoadingOverlay/LoadingOverlay.jsx'
import { decodeToken } from "react-jwt";

const ProfileArticles = () => {
  let token = getSimpleToken();
  const params = useParams();
  const [activeButton, setActiveButton] = useState("date-DESC");
 
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
  console.log(isOwner)
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
        {articles &&
          articles.map((article, index) => {
            const isLastElement = articles.length === index + 1;
            return (
              <ProfileArticle
                article={article}
                isOwner={isOwner}
                key={article.id}
                ref={isLastElement ? lastArticleElementRef : null}
              />
            );
          })}
        {isPending && <LoadingIndicator />}
      </div>
    </section>
  );
};

export default ProfileArticles;
