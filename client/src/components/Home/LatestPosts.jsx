import Article from "../Articles/Article";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../../utils/http";
import classes from "./LatesPosts.module.css";
import postsClasses from "../Articles/Articles.module.css";

import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";


const LatestPosts = () => {
  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["articles", { max: 3 }],
    queryFn: ({ signal }) => fetchArticles({ max: 3, signal }),
  });
  let content = null;
  if (isLoading) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = (
      <ErrorContainer title="An error occurred" message={error.message} />
    );
  }
  if (data) {
    content = (
      <>
        <section className={postsClasses.posts}>
          {data.map((post) => (
            <Article
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              date={post.date}
              personName={post.personName}
              img={post.img}
              rating={post.rating}
            />
          ))}
        </section>

        <Link to="/posts">
          <button className={classes.button}>all articles</button>
        </Link>
      </>
    );
  }
  return (
    <section className={classes["latest-posts"]}>
      <h1>Latests articles</h1>
      {content}
    </section>
  );
};

export default LatestPosts;
