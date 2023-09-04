import React,{useMemo} from "react";

import { useParams } from "react-router-dom";
import styles from "./PostDetails.module.css";
import ReactStars from "react-rating-stars-component";
import Reviews from "./Reviews";
import { FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import moment from "moment";
import { countWords, calculateReadingTime, formatReadingTime } from '../../../utils/reading-time';
const PostDetails = () => {
  const post = {
    id: "e1",
    title: "Golden Glory: The Art of Chasing Sunsets",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et justo. Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et justo. Lorem ipsum dolor sit amet, consecteturLorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et justo. Lorem ipsum dolor sit amet, consectetur",
    date: "01/08/2023 14:30",
    personName: "Alice Green",
    img: "https://picsum.photos/800/1200",
    content: [
      {
        type: "paragraph",
        value: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
      },
      {
        type: "paragraph",
        value:
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      },
      { type: "image", value: "https://picsum.photos/800/1200?random=1" },
      {
        type: "paragraph",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        type: "paragraph",
        value:
          "Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.",
      },
      { type: "image", value: "https://picsum.photos/800/1200?random=2" },
      { type: "image", value: "https://picsum.photos/800/1200?random=3" },
      { type: "image", value: "https://picsum.photos/800/1200?random=4" },
      { type: "image", value: "https://picsum.photos/800/1200?random=5" },
      { type: "image", value: "https://picsum.photos/800/1200?random=6" },
      {
        type: "paragraph",
        value:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        type: "paragraph",
        value:
          "Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.",
      },
      { type: "image", value: "https://picsum.photos/800/1200?random=6" },
      {
        type: "paragraph",
        value:
          "Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.Czwarty akapit o tym, jak zachody słońca wpływają na nasze samopoczucie.",
      },
    ],
    rating: 4,
  };

  const { title, description, img, personName, date, rating, content } = post;
  const params = useParams();
  // Konwersja daty na czytelny format
  const formattedDate = moment(new Date(date)).format("DD MMMM YYYY, HH:mm");
  

  const readingTime = useMemo(() => {
    const allParagraphs = content
      .filter((item) => item.type === "paragraph")
      .map((item) => item.value)
      .join(" ");
    const totalWords = countWords(allParagraphs) + countWords(description);
    return formatReadingTime(calculateReadingTime(totalWords));
  }, []);



  // Obliczenie czasu czytania (załóżmy, że 5 minut na każdy akapit)
  

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  let imageGroup = [];
  return (
    <section key={"details-"+params.postId} className={styles.container}>
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
      <img src={img} alt={title} loading="lazy" />
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
                  <p className={styles.paragraph}>
                    {item.value}
                  </p>
                </div>
              )
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
      <Reviews/>
    </section>
  );
};

export default PostDetails;
