import { useEffect, useState } from "react";
import axios from "axios";
import {useQuery} from '@tanstack/react-query'


export function useFetchArticles({ pageNumber }) {
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);
  
    useEffect(() => {
      setIsPending(true);
      setError(null);
  
      axios({
        method: "GET",
        url: "http://localhost:4002/articles",
        params: { page: pageNumber },
      })
        .then((res) => {
          setData((prevArticles) => {
            const articlesMap = new Map();
  
            // Populate the map with previous articles
            for (const article of prevArticles) {
              articlesMap.set(article.id, article);
            }
  
            // Update the map with the new articles
            for (const article of res.data) {
              articlesMap.set(article.id, article);
            }
  
            // Convert the map back into an array
            return Array.from(articlesMap.values());
          });
          
          setHasMore(res.data.length > 0);
          setIsPending(false);
        })
        .catch((err) => {
          setIsError(true);
          setError(err);
        });
    }, [pageNumber]);
  
    return { isPending, error, isError, data, hasMore };
  }
  