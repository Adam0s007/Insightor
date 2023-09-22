import React from 'react';
import styles from "./ProfileArticles.module.css";
import ProfileArticle from "../ProfileArticle/ProfileArticle";
import LoadingIndicator from "../../../ui/LoadingIndicator/LoadingIndicator.jsx";
import ErrorContainer from "../../../ui/ErrorContainer/ErrorContainer.jsx";

const ArticleList = ({ localArticles, isPending, error, isOwner, handleDeleteArticle, lastArticleElementRef }) => {
  return (
    <div className={styles.articles}>
      {localArticles.map((article, index) => {
        const isLastElement = localArticles.length === index + 1;
        return (
          <ProfileArticle
            article={article}
            isOwner={isOwner}
            key={article.id}
            onDelete={handleDeleteArticle}
            ref={isLastElement ? lastArticleElementRef : null}
          />
        );
      })}
      {isPending && <LoadingIndicator />}
      {error && <ErrorContainer message={error.message} />}
    </div>
  );
}

export default ArticleList;
