import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import styles from "./ArticleForm.module.css";

const Categories = ({ categories, onAddCategory, onRemoveCategory }) => {
  const [newCategory, setNewCategory] = useState("");

  return (
    <>
      <div className={styles.categories}>
        {categories.map((cat, idx) => (
          <span key={idx} className={styles.categoryTag}>
            {cat.name}
            <button
              type="button"
              className={styles.removeCategoryButton}
              onClick={() => onRemoveCategory(cat.name)}
            >
              x
            </button>
          </span>
        ))}
      </div>
      <div className={`${styles.inputWrapper} ${styles.tagWrapper}`}>
        <input
          className={`${styles.input} ${styles.newTag}`}
          type="text"
          placeholder="Add new tag..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          type="button"
          onClick={() => { onAddCategory(newCategory); setNewCategory(""); }}
          className={styles.addButton}
        >
          <FaPlus style={{ marginTop: "2px" }} />
        </button>
      </div>
    </>
  );
};

export default Categories;
