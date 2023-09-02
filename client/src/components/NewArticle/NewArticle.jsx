import React, { useState, useRef } from "react";
import AutoExpandTextArea from "../../ui/AutoExpandTextArea.jsx";
import styles from "./NewArticle.module.css";

const NewArticle = () => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    date: null,
    personName: null,
    content: [],
  });

  const addItem = (type) => {
    setArticle({
      ...article,
      content: [...article.content, { type, value: "" }],
    });
  };

  const deleteItem = (index) => {
    const newContent = [...article.content];
    newContent.splice(index, 1);
    setArticle({ ...article, content: newContent });
  };

  const updateItem = (index, value) => {
    const newContent = [...article.content];
    newContent[index].value = value;
    setArticle({ ...article, content: newContent });
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
          maxLength={80}
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>short description </label>
        <AutoExpandTextArea
          className={styles.textarea}
          type="text"
          maxLength={300}
          value={article.description}
          onChange={(e) =>
            setArticle({ ...article, description: e.target.value })
          }
        />
      </div>

      {article.content.map((item, idx) => (
        <div key={idx} className={styles.inputWrapper}>
          {item.type === "paragraph" ? (
            <>
              <textarea
                className={styles.textarea}
                maxLength={1000}
                onChange={(e) => updateItem(idx, e.target.value)}
              />
              <label className={styles.counter}>
                {1000 - item.value.length} characters left
              </label>
            </>
          ) : (
            <>
              <input
                className={styles.input}
                type="text"
                maxLength={200}
                placeholder="Image URL"
                onChange={(e) => updateItem(idx, e.target.value)}
              />
            </>
          )}
          <button
            className={styles.buttonDelete}
            onClick={() => deleteItem(idx)}
          >
            Delete
          </button>
        </div>
      ))}
      <button className={styles.button} onClick={() => addItem("paragraph")}>
        Add Paragraph
      </button>
      <button className={styles.button} onClick={() => addItem("image")}>
        Add Image
      </button>

      <button className={styles.button} onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default NewArticle;
