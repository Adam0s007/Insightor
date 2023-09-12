import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./ArticleDetails.module.css";
import "./Animations.css";
import Reviews from "./Review/Reviews";

import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../../../utils/http";

import {
  calculateReadingTime,
  formatReadingTime,
} from "../../../utils/reading-time";
import { formatShortMonthDate } from "../../../utils/date-conventer";
import LoadingIndicator from "../../../ui/LoadingIndicator/LoadingIndicator";
import ErrorContainer from "../../../ui/ErrorContainer/ErrorContainer";
import MessageModal from "../../../ui/MessageModal/MessageModal";
import Exit from "../../../ui/Exit/Exit";

const ArticleDetails = () => {
  const params = useParams();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  // Pobierz dane przekazane przez navigate
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

  let imageGroup = [];

  let mainContent = null;

  if (isPending) {
    mainContent = <LoadingIndicator />;
  }
  if (isError) {
    mainContent = <ErrorContainer title="Error" message={error?.message} />;
  }
  if (data) {
    console.log(data);
    const personName =
      data?.user?.name + " " + data?.user?.surname ?? "Unknown Person";
    const title = data?.title ?? "Unknown Title";
    const img = data?.imgUrl ?? "";
    const description = data?.description ?? "";
    const content = data?.content ?? [];
    const readingTime = formatReadingTime(calculateReadingTime(content));
    const formattedDate = formatShortMonthDate(data?.date ?? "");

    const reviews = data?.reviews ?? [];
    const isOwner = data?.isOwner ?? false;
    mainContent = (
      
        <div className={styles.section}>
          <Exit path=".." />
          <div className={styles.postInfo}>
            <span>
              <FaUser className={styles.icon} /> {personName}
            </span>
            <span>
              <FaCalendarAlt className={styles.icon} /> {formattedDate}
            </span>
            <span>
              <FaClock className={styles.icon} /> {readingTime} of reading
            </span>
          </div>

          <h1>{title}</h1>
          <img
            src={img}
            alt={title}
            loading="lazy"
            className={styles.mainImage}
          />
          <p className={styles.description}>{description}</p>

          <div className={styles.article}>
            {content.map((item, index) => {
              if (item.type === "paragraph") {
                // Jeżeli mamy obrazy w grupie, renderujemy je przed akapitem
                if (imageGroup.length > 0) {
                  const images = (
                    <div
                      className={styles.imageGroup}
                      key={`img-group-${index}`}
                    >
                      {imageGroup}
                    </div>
                  );
                  imageGroup = []; // Resetujemy grupę
                  return (
                    <div key={`wrapper-${index}`}>
                      {images}
                      <p className={styles.paragraph}>{item.value}</p>
                    </div>
                  );
                }
                return (
                  <p className={styles.paragraph} key={index}>
                    {item.value}
                  </p>
                );
              } else {
                // Dodajemy obraz do grupy
                imageGroup.push(
                  <img
                    className={styles.image}
                    key={index}
                    src={item.value}
                    loading="lazy"
                    alt={`content-${index}-${title}`}
                  />
                );
                return null;
              }
            })}
            {/* Jeżeli po ostatnim akapicie są jeszcze obrazy */}
            {imageGroup.length > 0 && (
              <div className={styles.imageGroup}>{imageGroup}</div>
            )}
          </div>
          <Reviews reviews={reviews} isOwner={isOwner} />
        </div>
        
      
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
