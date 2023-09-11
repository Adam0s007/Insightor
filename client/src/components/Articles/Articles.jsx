
import Article from "./Article";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../../utils/http.js";
import classes from "./Articles.module.css";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer";


const Articles = () => {
  
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["articles"],
    queryFn:({signal}) => fetchArticles({signal}),
    staleTime: 4000,
  });

  let content = null;
  if (isPending) {
    content = <LoadingIndicator/>;
  }
  if (isError) {
    console.log("a tu probuje zlapac ten error:"+error);
    content = <ErrorContainer title="An error occurred" message={error.message}/>;
  }
  if (data) {
    
    content = (
        <>
            {data.map((post) => (
                <Article
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    personName={`${post.user?.name} ${post.user?.surname}`}
                    img={post.img}
                    rating={post.rating}
                />
            ))}
        </>
    );
}

  return <section className={classes.posts}>
    {content}
  </section>;
};

export default Articles;
