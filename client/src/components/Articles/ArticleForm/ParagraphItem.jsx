import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import AutoExpandTextArea from "../../../ui/AutoExpandTextArea.jsx";
import styles from "./ArticleForm.module.css";

const ParagraphItem = ({ item, idx, onUpdateItem, onDeleteItem }) => (
  <>
    <AutoExpandTextArea
      className={styles.textarea}
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

export default ParagraphItem;
