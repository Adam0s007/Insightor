import React from 'react';
import styles from './ArticleDetails.module.css';
import DOMPurify from 'dompurify';

const ArticleContent = ({ content, title }) => {
  let imageGroup = [];
  const renderedContent = [];

  content.forEach((item, index) => {
    if (item.type === "image") {
      imageGroup.push(
        <img
          className={styles.image}
          key={index}
          src={item.value}
          loading="lazy"
          alt={`content-${index}-${title}`}
        />
      );
    } else {
      if (imageGroup.length > 0) {
        renderedContent.push(
          <div className={styles.imageGroup} key={`img-group-${renderedContent.length}`}>
            {imageGroup}
          </div>
        );
        imageGroup = [];
      }

      if (item.type === "paragraph") {
        renderedContent.push(
          <p className={styles.paragraph} key={index}>
            {item.value}
          </p>
        );
      } else if (item.type === "editor") {
        renderedContent.push(
          <div 
            className={styles.editorContent} 
            key={index} 
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.value) }}
          />
        );
      }
    }
  });

  if (imageGroup.length > 0) {
    renderedContent.push(
      <div className={styles.imageGroup} key={`img-group-${renderedContent.length}`}>
        {imageGroup}
      </div>
    );
  }

  return <div className={styles.article}>{renderedContent}</div>;
}

export default ArticleContent;
