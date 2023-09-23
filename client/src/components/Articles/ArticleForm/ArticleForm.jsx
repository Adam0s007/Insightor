import React, { useState } from "react";
import styles from "./ArticleForm.module.css";
import ArticleInfoInput from "./ArticleInfoInput.jsx";
import ArticleInfoTextarea from "./ArticleInfoTextarea.jsx";
import Content from "./Content.jsx";
import Categories from "./Categories.jsx";
import useDebounce from "../../../hooks/use-debounce";

const ArticleForm = (props) => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    imgUrl: "",
    content: [],
    rating: 0,
    categories: [],
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
    console.log(article)
  };

  const handleAddCategory = (newCategory) => {
    if (
      newCategory &&
      !article.categories.some((cat) => cat.name === newCategory)
    ) {
      setArticle({
        ...article,
        categories: [...article.categories, { name: newCategory }],
      });
     
    }
  };

  const handleRemoveCategory = (categoryValueToRemove) => {
    setArticle({
      ...article,
      categories: article.categories.filter(
        (cat) => cat.name !== categoryValueToRemove
      ),
    });
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
    article.content.some((item) => item.value.length === 0) ||
    article.categories.length === 0;

    return (
      <form onSubmit={handleSubmit} className={styles.container}>
        <h1 className={styles.heading}>
          {props.type === "new" ? "Create an article!" : "Edit an article!"}
        </h1>
        <ArticleInfoInput 
          id="title"
          label="Title"
          maxLength={80}
          value={article.title}
          onChange={(value) => setArticle({ ...article, title: value })}
        />
        <ArticleInfoTextarea 
          id="description"
          label="Short description"
          maxLength={1000}
          value={article.description}
          onChange={(value) => setArticle({ ...article, description: value })}
        />
        <ArticleInfoInput 
          id="thumbnail"
          label="Thumbnail"
          maxLength={200}
          placeholder="Image URL"
          value={article.imgUrl}
          onChange={(value) => setArticle({ ...article, imgUrl: value })}
        />
        <Categories 
          categories={article.categories}
          onAddCategory={handleAddCategory}
          onRemoveCategory={handleRemoveCategory}
        />
        <Content 
          content={article.content}
          onAddItem={addItem}
          onDeleteItem={deleteItem}
          onUpdateItem={updateItem}
        />
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
