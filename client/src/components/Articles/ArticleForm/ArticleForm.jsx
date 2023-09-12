import React, { useState } from "react";
import AutoExpandTextArea from "../../../ui/AutoExpandTextArea.jsx";
import styles from "./ArticleForm.module.css";

const ArticleForm = (props) => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    imgUrl: "",
    content: [],
    rating: 0,
    ...(props.data || {}),
  });

  const addItem = (type) => {
    setArticle({
      ...article,
      content: [...article.content, { type, value: "" }],
    });
  };

  const deleteItem = (index) => {
    console.log("tu sie wykonuję!");
    const newContent = [...article.content];
    newContent.splice(index, 1);
    setArticle({ ...article, content: newContent });
  };

  const updateItem = (index, value) => {
    const newContent = [...article.content];
    newContent[index].value = value;
    setArticle({ ...article, content: newContent });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(article);
  };

  const isNotValidForm =
    article.title.length === 0 ||
    article.description.length === 0 ||
    article.imgUrl.length === 0 ||
    article.content.length === 0 ||
    article.content.some((item) => item.value.length === 0);

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h1 className={styles.heading}>
        {props.type === "new" ? "Create an article!" : "Edit an article!"}
      </h1>

      <div className={styles.inputWrapper}>
        <label className={styles.label}>Title </label>
        <input
          className={styles.input}
          type="text"
          maxLength={80}
          defaultValue={article.title ?? ""}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>short description </label>
        <AutoExpandTextArea
          className={styles.textarea}
          type="text"
          maxLength={300}
          defaultValue={article.description ?? ""}
          onChange={(e) =>
            setArticle({ ...article, description: e.target.value })
          }
        />
      </div>
      <div className={styles.inputWrapper}>
        <label className={styles.label}>thumbnail </label>
        <input
          className={styles.input}
          type="text"
          maxLength={200}
          placeholder="Image URL"
          defaultValue={article.imgUrl ?? ""}
          onChange={(e) => setArticle({ ...article, imgUrl: e.target.value })}
        />
      </div>

      {article.content.map((item, idx) => (
        <div key={idx} className={styles.inputWrapper}>
          {item.type === "paragraph" ? (
            <>
              <AutoExpandTextArea
                className={styles.textarea}
                maxLength={1000}
                onChange={(e) => updateItem(idx, e.target.value)}
                defaultValue={item.value ?? ""}
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
                defaultValue={item.value ?? ""}
                onChange={(e) => updateItem(idx, e.target.value)}
              />
            </>
          )}
          <button
            type="button"
            className={styles.buttonDelete}
            onClick={() => deleteItem(idx)}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        className={styles.button}
        onClick={() => addItem("paragraph")}
      >
        Add Paragraph
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={() => addItem("image")}
      >
        Add Image
      </button>

      <button
        className={styles.submitButton}
        disabled={isNotValidForm}
        type="submit"
      >
        {props.type === "new" ? "Create!" : "Update!"}
      </button>
    </form>
  );
};

export default ArticleForm;
