import React from "react";
import AutoExpandTextArea from "../../../ui/AutoExpandTextArea.jsx";
import styles from "./ArticleForm.module.css";

const ArticleInfoTextarea = ({ id, label, maxLength, value, onChange }) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <AutoExpandTextArea
        className={styles.textarea}
        id={id}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ArticleInfoTextarea;
