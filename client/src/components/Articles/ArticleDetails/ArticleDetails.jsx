import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ArticleDetails.module.css";
import "./Animations.css";
import Reviews from "./Reviews";
import ModalWithMenu from "./ModalWithMenu";
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
import Exit from "../../../ui/Exit/Exit";
const animationTiming = {
  enter: 800,
  exit: 1000,
};

const ArticleDetails = () => {
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["article", params.articleId],
    queryFn: ({ signal }) => fetchArticle({ signal, id: params.articleId }),
  });

  console.log(data);
  // Konwersja daty na czytelny format

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  let imageGroup = [];

  const [isModalVisible, setisModalVisible] = useState(false);
  const [newContent, setNewContent] = useState(null);

  const menuClickHandler = (menu) => {
    switch (menu) {
      case "reviews":
        setNewContent(<Reviews />);
        setisModalVisible(true);
        break;
      default:
        break;
    }
  };
  let mainContent = null;

  if (isPending) {
    mainContent = <LoadingIndicator />;
  }
  if (isError) {
    mainContent = <ErrorContainer title="Error" message={error?.message} />;
  }
  if (data) {
    console.log(data);
    const personName = data?.personName ?? "Unknown Person";
    const title = data?.title ?? "Unknown Title";
    const img = data?.img ?? "";
    const description = data?.description ?? "";
    const content = data?.content ?? [];
    const readingTime = formatReadingTime(calculateReadingTime(content));
    const formattedDate = formatShortMonthDate(data?.date ?? "");
    mainContent = (
      <>
        <ModalWithMenu
          isModalVisible={isModalVisible}
          closeModal={() => setisModalVisible(false)}
          content={newContent}
          menuClickHandler={menuClickHandler}
        />
        
        
        <Exit path=".."/>
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
                  <div className={styles.imageGroup} key={`img-group-${index}`}>
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
      </>
    );
  }

  return (
    <section key={"details-" + params.postId} className={styles.container}>
      {mainContent}
    </section>
  );
};

export default ArticleDetails;
