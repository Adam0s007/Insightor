import React, { useState, useRef } from "react";
import styles from "./NewArticle.module.css";

const NewArticle = () => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    date: null,
    personName: null,
    paragraphs: [],
    images: [],
  });

  const addParagraph = () => {
    if (article.paragraphs.length < 5) {
      setArticle({ ...article, paragraphs: [...article.paragraphs, ""] });
    }
  };

  const addImage = () => {
    if (article.images.length < 5) {
      setArticle({ ...article, images: [...article.images, ""] });
    }
  };

  const deleteParagraph = (index) => {
    const newParagraphs = [...article.paragraphs];
    newParagraphs.splice(index, 1);
    setArticle({ ...article, paragraphs: newParagraphs });
  };

  const deleteImage = (index) => {
    const newImages = [...article.images];
    newImages.splice(index, 1);
    setArticle({ ...article, images: newImages });
  };

  const submitHandler = () => {
    setArticle({
      ...article,
      date: new Date(),
      personName: "Current User",
    });
    // Tutaj możesz dodać logikę zapisu artykułu, np. do bazy danych
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>New Article</h1>

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Title </label>
        <input
          className={styles.input}
          type="text"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>Description: </label>
        <input
          className={styles.input}
          type="text"
          value={article.description}
          onChange={(e) =>
            setArticle({ ...article, description: e.target.value })
          }
        />
      </div>

      <h2 className={styles.heading}>Paragraphs</h2>
      {article.paragraphs.map((para, idx) => (
        <div key={idx} className={styles.inputWrapper}>
          <textarea
            className={styles.textarea}
            value={para}
            maxLength={1000}
            onChange={(e) => {
              const newParagraphs = [...article.paragraphs];
              newParagraphs[idx] = e.target.value;
              setArticle({ ...article, paragraphs: newParagraphs });
            }}
          />
          <label className={styles.counter}>
            {1000 - para.length} characters left
          </label>
          <button
            className={styles.buttonDelete}
            onClick={() => deleteParagraph(idx)}
          >
            Delete
          </button>
        </div>
      ))}
      <button className={styles.button} onClick={addParagraph}>
        Add Paragraph
      </button>

      <h2 className={styles.heading}>Images</h2>
      {article.images.map((img, idx) => (
        <div className={styles.inputWrapper} key={idx}>
          <input
            className={styles.input}
            type="text"
            placeholder="Image URL"
            value={img}
            onChange={(e) => {
              const newImages = [...article.images];
              newImages[idx] = e.target.value;
              setArticle({ ...article, images: newImages });
            }}
          />
          <button
            className={styles.buttonDelete}
            onClick={() => deleteImage(idx)}
          >
            Delete
          </button>
        </div>
      ))}
      <button className={styles.button} onClick={addImage}>
        Add Image
      </button>
      <button className={styles.button} onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default NewArticle;
