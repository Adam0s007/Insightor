import React, { useCallback, useState, useRef, useEffect } from "react";
import Article from "./Article";
import classes from "./Articles.module.css";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";
import { useFetchArticles } from "../../hooks/use-fetch-articles";
import SearchBar from "./SearchBar";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../utils/http";
import SortingFilter from "./SortingFilter";
import { CategoryTags } from "../../ui/Tag/Tag";

const Articles = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [pageNumber, setPageNumber] = useState(1);
  const [areCategoriesExpanded, setCategoriesExpanded] = useState(false);
  const [filters, setFilters] = useState({
    sort: "",
    order: "",
    text: "",
    category: "",
  });
  const { articles, isPending, error, hasMore } = useFetchArticles({
    pageNumber,
    filters,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => fetchCategories({ signal }),
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
  const filtersSubmitHandler = useCallback((newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    setPageNumber(1);
  }, []);
  
  const handleCategoriesClick = () => {
    setCategoriesExpanded((prevState) => !prevState);
  };

  return (
    <section className={classes.posts}>
      <div className={classes.search}>
        <div className={classes.mainSearch}>
          <SearchBar
            onFiltersSubmit={filtersSubmitHandler}
          />
          <span
            onClick={handleCategoriesClick}
            className={classes.expandCategories}
          >
            Tags
          </span>

          <SortingFilter onFiltersSubmit={filtersSubmitHandler} />
        </div>
        <div
          className={`${classes.categories} ${
            areCategoriesExpanded ? `${classes.active}` : ""
          }`}
        >
          <CategoryTags
            categories={categories}
            onCategoryClick={(category) => {
              if(category == "All categories") category = ""
              filtersSubmitHandler({ category: category });
            }}
          />
        </div>
      </div>
      <div className={classes.articles}>
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
                reviewsCount={post.reviewsCount}
              />
            );
          })}
      </div>
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
