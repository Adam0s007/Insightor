import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../utils/http";

export function useFetchArticles({ pageNumber }) {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["articles", {pageNumber}],
    queryFn: ({ signal }) => fetchArticles({ signal, page: pageNumber })
  });

  useEffect(() => {
    if(data){
        
        setArticles((prevArticles) => {
            const articlesMap = new Map();
            for (const article of prevArticles) {
              articlesMap.set(article.id, article);
            }
            for (const article of data) {
              articlesMap.set(article.id, article);
            }
            return Array.from(articlesMap.values());
          });
          setHasMore(data.length > 0);
          console.log(articles)
    }
    
  }, [data]);

  return { isPending, error, isError, articles, hasMore };
}
