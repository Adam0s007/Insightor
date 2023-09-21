import React, { useCallback, useState, useRef, useEffect } from "react";
import Article from "./Article";
import classes from "./Articles.module.css";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";
import { Link } from "react-router-dom";
import { getSimpleToken } from "../../utils/auth";
import { useFetchArticles } from "../../hooks/use-fetch-articles";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const Articles = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const token = getSimpleToken();
  const [pageNumber, setPageNumber] = useState(1);
  const filters = useSelector((state) => state.filters);
  const { articles, isPending, error, hasMore } = useFetchArticles({
    pageNumber,
    filters,
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

  const isFiltersEmpty = () => {
    
    return Object.values(filters).every((value) => value === "");
  };
  return (
    <section className={classes.posts}>
      <SearchBar
        onFiltersSubmit={filtersSubmitHandler}
        isPending={isPending}
        token={token}
      />
      <h2 className={classes.filterStatus}>
        {isFiltersEmpty() && !filters.category ? "Our recommendations" : ""}
        {!isFiltersEmpty() && !filters.category  && "Search results"}
        {filters.category && `#${filters.category}`}
      </h2>
      {articles &&
        articles.map((post, index) => {
          const isLastElement = articles.length === index + 1;
          return (
            <Article
              key={post.id}
              ref={isLastElement ? lastArticleElementRef : null}
              id={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              personName={`${post.user?.name} ${post.user?.surname}`}
              img={post.imgUrl}
              rating={post.rating}
            />
          );
        })}
      <div className={classes.fullWidth}>
        {isPending && <LoadingIndicator />}
        {error && (
          <ErrorContainer title="An error occurred" message={error.message} />
        )}
      </div>
    </section>
  );
};

export default Articles;
