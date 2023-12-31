import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../utils/http";

import axios from "axios";
import {defaultUrl} from '../utils/http'


export function useFetchArticles({ pageNumber, filters,user="" }) {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const queryObject = {
      page: pageNumber,
      ...filters,
    };
    
    setIsPending(true);
    setError(false);

    
    if (pageNumber === 1) {
      setArticles([]);
    }
    console.log(queryObject);

    let cancel;
    axios({
      method: "GET",
      url: defaultUrl + "/articles"+user,
      params: queryObject,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        //console.log(res.data);
        setArticles((prevArticles) => {
          const uniqueArticles = new Map();
          [...prevArticles, ...res.data].forEach(article => uniqueArticles.set(article.id, article));
          return Array.from(uniqueArticles.values());
        });
        setHasMore(res.data.length > 0);
        setIsPending(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
        setIsPending(false);
      });

    return () => cancel();

  }, [pageNumber, filters]);

  return { isPending, error, articles, hasMore };
}
