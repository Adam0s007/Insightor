import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createNewArticle, queryClient } from "../../utils/http";
import LoadingIndicator from "../../ui/LoadingIndicator/LoadingIndicator.jsx";
import ErrorContainer from "../../ui/ErrorContainer/ErrorContainer.jsx";
import AutoExpandTextArea from "../../ui/AutoExpandTextArea.jsx";
import styles from "./NewArticle.module.css";

const NewArticle = () => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    img: "",
    personName: "Current User", // set default value here
    content: [],
    rating: 0,
  });

  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
     navigate("/articles");
    },
  });
  function handleSubmit(event) {
    event.preventDefault();
    mutate({ articleData: article });
  }


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

  let actualContent =  (
      <form className={styles.container} onSubmit={handleSubmit}>
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
        <div className={styles.inputWrapper}>
          <label className={styles.label}>thumbnail for the article </label>
          <input
            className={styles.input}
            type="text"
            maxLength={200}
            placeholder="Image URL"
            onChange={(e) => setArticle({ ...article, img: e.target.value })}
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
  
        {isError && <div className={styles.error}>{error.message}</div>}
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    );
  
    if(isPending) {
      actualContent = <LoadingIndicator/>
    }
    
  return (
    <div className={styles.container}>
    {actualContent}
    </div>
    )
};

export default NewArticle;
