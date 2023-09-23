import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import styles from "./ArticleForm.module.css";

const ImageItem = ({ item, idx, onUpdateItem, onDeleteItem }) => (
  <>
    <input
      className={styles.input}
      type="text"
      maxLength={200}
      placeholder="Image URL"
      value={item.value ?? ""}
      onChange={(e) => onUpdateItem(idx, e.target.value)}
    />
    <button
      type="button"
      className={styles.buttonDelete}
      onClick={() => onDeleteItem(idx)}
    >
      <RiDeleteBinLine />
    </button>
  </>
);

export default ImageItem;
