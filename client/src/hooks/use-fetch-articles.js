import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../utils/http";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {defaultUrl} from '../utils/http'


export function useFetchArticles({ pageNumber, trigger }) {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryObject = {
      page: pageNumber,
      authorName: searchParams.get("authorName") ?? '',
      authorSurname: searchParams.get("authorSurname") ?? '',
      dateFrom: searchParams.get("dateFrom") ?? '',
      dateTo: searchParams.get("dateTo") ?? '',
      rating: searchParams.get("rating") ?? '',
      text: searchParams.get("text") ?? '',
      sort: searchParams.get("sort") ?? '',
      order: searchParams.get("order") ?? '',
    };
    console.log(queryObject);
    setIsPending(true);
    setError(false);

    
    if (pageNumber === 1) {
      setArticles([]);
    }

    let cancel;
    axios({
      method: "GET",
      url: defaultUrl + "/articles",
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
       // console.log(e);
        setError(true);
        setIsPending(false);
      });

    return () => cancel();

  }, [pageNumber, trigger]);

  return { isPending, error, articles, hasMore };
}
