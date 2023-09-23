import React from "react";
import { FaPlus } from "react-icons/fa";
import ParagraphItem from "./ParagraphItem";
import ImageItem from "./ImageItem";
import QuillEditorItem from "./QuillEditorItem"; // Nowy import
import styles from "./ArticleForm.module.css";

const contentComponents = {
  paragraph: ParagraphItem,
  image: ImageItem,
  editor: QuillEditorItem, // Dodanie nowego typu komponentu
};

const Content = ({ content, onAddItem, onDeleteItem, onUpdateItem }) => {
  return (
    <>
      {content.map((item, idx) => {
        const ContentComponent = contentComponents[item.type];
        return (
          <div key={idx} className={styles.inputWrapper}>
            <ContentComponent
              item={item}
              idx={idx}
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
            />
          </div>
        );
      })}
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonParagraph}`}
          onClick={() => onAddItem("paragraph")}
        >
          <FaPlus /> Paragraph
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonImage}`}
          onClick={() => onAddItem("image")}
        >
          <FaPlus /> Image
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonQuillEditor}`} // Nowy styl do dodania
          onClick={() => onAddItem("editor")}
        >
          <FaPlus /> Quill Editor
        </button>
      </div>
    </>
  );
};

export default Content;
