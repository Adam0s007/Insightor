import React, { useCallback, useState, useRef } from "react";
import Article from "./Article";
import classes from "./Articles.module.css";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";
import { Link } from "react-router-dom";
import { getSimpleToken } from "../../utils/auth";
import { useFetchArticles } from "../../hooks/use-fetch-articles";

const Articles = () => {
  const token = getSimpleToken();
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isPending, isError, error, hasMore } = useFetchArticles({
    pageNumber,
  });
  const observer = useRef();
  const lastArticleElementRef = useCallback((node) => {
    if (isPending) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    },{ rootMargin: '0px 0px 0px 0px' });
    if (node) observer.current.observe(node);
  },[isPending, hasMore]);

  return (
    <>
      {token && (
        <div className={classes.addArticle}>
          <Link to="new">New Article</Link>
        </div>
      )}
      <section className={classes.posts}>
        {data && data.map((post, index) => {
          const isLastElement = data.length === index + 1;
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
        {isPending && <LoadingIndicator />}
        {isError && <ErrorContainer title="An error occurred" message={error.message} />}
      </section>
    </>
  );
};

export default Articles;
