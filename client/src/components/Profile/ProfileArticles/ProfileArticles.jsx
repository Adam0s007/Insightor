import { getSimpleToken } from "../../../utils/auth.js";
import { useCallback, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchArticles } from "../../../hooks/use-fetch-articles";
import styles from "./ProfileArticles.module.css";
import { decodeToken } from "react-jwt";
import { deleteArticle, queryClient } from "../../../utils/http";
import { useMutation } from "@tanstack/react-query";
import MessageModal from "../../../ui/MessageModal/MessageModal.jsx";
import SortMenu from "./SortMenu";
import { fetchCategoriesByUser } from "../../../utils/http";
import { useQuery } from "@tanstack/react-query";
import ArticleList from "./ArticleList";
const ProfileArticles = () => {
  let token = getSimpleToken();
  const params = useParams();
  const [activeButton, setActiveButton] = useState("date-DESC");
  const [localArticles, setLocalArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({
    sort: "date",
    order: "DESC",
  });
  let userId = "";
  if (token) {
    userId = decodeToken(token).id;
  }
  let isOwner = false;
  let endPoint = "/user/" + params.userId;
  if (userId === params.userId) {
    isOwner = true;
  }

  const { isPending, error, articles, hasMore } = useFetchArticles({
    pageNumber,
    filters,
    user: endPoint,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories", params.userId],
    queryFn: ({ signal }) =>
      fetchCategoriesByUser({ signal, userId: params.userId }),
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

  const handleSortChange = (sortBy, type = "DESC") => {
    const sortValue = `${sortBy}-${type}`;
    setActiveButton(sortValue);
    if(sortBy === 'Popularity') sortBy = 'reviews';
    setFilters({
      ...filters,
      sort: sortBy,
      order: type,
    });
    setPageNumber(1); // Reset page number on sort change
  };

  const handleCategoryChange = (label) => {
    if (label === "All categories") label = "";
    const selectedCategory = label;
    setFilters((prev) => ({
      ...prev,
      category: selectedCategory,
    }));
    setPageNumber(1);
  };

  useEffect(() => {
    setLocalArticles(articles);
  }, [articles]);

  const { mutate } = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });

  const handleDeleteArticle = (articleId) => {
    mutate(
      { id: articleId },
      {
        onSuccess: () => {
          setModalMessage("Article deleted successfully.");
          setModalType("success");
          setShowModal(true);
          setLocalArticles((prevArticles) =>
            prevArticles.filter((article) => article.id !== articleId)
          );
        },
        onError: () => {
          setModalMessage("Error deleting article. Please try again.");
          setModalType("error");
          setShowModal(true);
        },
      }
    );
  };
  return (
    <section className={styles.articlesContainer}>
      {showModal && (
        <MessageModal
          message={modalMessage}
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}
      <SortMenu
        activeButton={activeButton}
        handleSortChange={handleSortChange}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
      />

      <ArticleList
        localArticles={localArticles}
        isPending={isPending}
        error={error}
        isOwner={isOwner}
        handleDeleteArticle={handleDeleteArticle}
        lastArticleElementRef={lastArticleElementRef}
      />
    </section>
  );
};

export default ProfileArticles;
