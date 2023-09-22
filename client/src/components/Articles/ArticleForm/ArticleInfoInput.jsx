import React from "react";
import styles from "./ArticleForm.module.css";

const ArticleInfoInput = ({ id, label, maxLength, placeholder, value, onChange }) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="text"
        id={id}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ArticleInfoInput;
