import React, { useCallback, useState, useRef, useEffect } from "react";
import Article from "./Article";
import classes from "./Articles.module.css";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";
import { initialFilters } from "../../store/filters-slice";
import { getSimpleToken } from "../../utils/auth";
import { useFetchArticles } from "../../hooks/use-fetch-articles";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { updateFilters } from "../../store/filters-slice";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../utils/http";
import SortingFilter from "./SortingFilter";
import { CategoryTags } from "../../ui/Tag/Tag";

const Articles = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const token = getSimpleToken();
  const [pageNumber, setPageNumber] = useState(1);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
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
  const filtersSubmitHandler = () => {
    setPageNumber(1);
  };
  
  return (
    <section className={classes.posts}>
      <SearchBar
        onFiltersSubmit={filtersSubmitHandler}
        isPending={isPending}
        token={token}
      />
      <SortingFilter onFiltersSubmit={filtersSubmitHandler} />
      <h2 className={classes.filterStatus}>
        {!filters.category ? "#All categories" : ""}
        {filters.category && `#${filters.category}`}
      </h2>
      <div className={classes.categories}>
        <CategoryTags
          categories={categories?.map((cat) => cat.name)}
          onCategoryClick={(category) => {
            if (category === "All categories") {
              dispatch(updateFilters({ category: "" }));
            } else {
              dispatch(updateFilters({ category}));
            }
            setPageNumber(1);
          }}
        />
      </div>
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
