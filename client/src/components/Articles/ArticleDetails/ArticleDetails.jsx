import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./ArticleDetails.module.css";
import Reviews from "./Review/Reviews";
import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../../../utils/http";
import {
  calculateReadingTime,
  formatReadingTime,
} from "../../../utils/reading-time";
import LoadingIndicator from "../../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../../ui/ErrorContainer/ErrorContainer";
import MessageModal from "../../../ui/MessageModal/MessageModal";
import ArticleInfo from "./ArticleInfo";
import ArticleContent from "./ArticleContent";
import {getPicture} from '../../../utils/pictures'
const ArticleDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const modalMessage = location.state?.message;
  const type = location.state?.type;

  useEffect(() => {
    if (modalMessage && type) {
      setShowModal(true);
    }
  }, [modalMessage, type]);

  const closeModal = () => {
    setShowModal(false);
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["article", params.articleId],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.articleId }),
  });

  let mainContent = null;

  if (isPending) {
    mainContent = <LoadingIndicator />;
  } else if (isError) {
    mainContent = <ErrorContainer title="Error" message={error?.message} />;
  } else if (data) {
    const title = data?.title ?? "Unknown Title";
    const img = getPicture(data?.imgUrl)
    const description = data?.description ?? "";
    const content = data?.content ?? [];
    const readingTime = formatReadingTime(calculateReadingTime(content));

    mainContent = (
      <article className={styles.section}>
        <ArticleInfo
          user={data.user}
          date={data?.date}
          readingTime={readingTime}
          categories={data?.categories ?? []}
        />
        <h1>{title}</h1>
        <img src={img} alt={title} loading="lazy" className={styles.mainImage} />
        <p className={styles.description}>{description}</p>
        <ArticleContent content={content} title={title} />
        <Reviews reviews={data?.reviews ?? []} isOwner={data?.isOwner ?? false} />
      </article>
    );
  }

  return (
    <section key={"details-" + params.postId} className={styles.container}>
      {showModal && (
        <MessageModal type={type} message={modalMessage} onClose={closeModal} />
      )}
      {mainContent}
    </section>
  );
};

export default ArticleDetails;
