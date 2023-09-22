import React from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import AutoExpandTextArea from "../../../ui/AutoExpandTextArea.jsx";
import styles from "./ArticleForm.module.css";

const Content = ({ content, onAddItem, onDeleteItem, onUpdateItem }) => {
  return (
    <>
      {content.map((item, idx) => (
        <div key={idx} className={styles.inputWrapper}>
          {item.type === "paragraph" ? (
            <>
              <AutoExpandTextArea
                className={styles.textarea}
                maxLength={6000}
                value={item.value ?? ""}
                onChange={(e) => onUpdateItem(idx, e.target.value)}
              />
              <label className={styles.counter}>
                {6000 - (item.value.length || 0)} characters left
              </label>
            </>
          ) : (
            <input
              className={styles.input}
              type="text"
              maxLength={200}
              placeholder="Image URL"
              value={item.value ?? ""}
              onChange={(e) => onUpdateItem(idx, e.target.value)}
            />
          )}
          <button
            type="button"
            className={styles.buttonDelete}
            onClick={() => onDeleteItem(idx)}
          >
            <RiDeleteBinLine />
          </button>
        </div>
      ))}
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
      </div>
    </>
  );
};

export default Content;
