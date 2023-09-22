import React from 'react';
import styles from './ArticleDetails.module.css';

const ArticleContent = ({ content, title }) => {
  let imageGroup = [];

  return (
    <div className={styles.article}>
      {content.map((item, index) => {
        if (item.type === "paragraph") {
          if (imageGroup.length > 0) {
            const images = (
              <div className={styles.imageGroup} key={`img-group-${index}`}>
                {imageGroup}
              </div>
            );
            imageGroup = [];
            return (
              <div key={`wrapper-${index}`}>
                {images}
                <p className={styles.paragraph}>{item.value}</p>
              </div>
            );
          }
          return <p className={styles.paragraph} key={index}>{item.value}</p>;
        } else {
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
      {imageGroup.length > 0 && (
        <div className={styles.imageGroup}>{imageGroup}</div>
      )}
    </div>
  );
}

export default ArticleContent;
