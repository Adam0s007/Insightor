import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import stylów edytora
import styles from "./ArticleForm.module.css";

const QuillEditorItem = ({ item, idx, onUpdateItem, onDeleteItem }) => {
  
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['link'], // Dodano opcję hiperlinku
        ['clean'],
      ];
      
    

  return(<>
     <div className={styles["quill-editor-container"]}> 
      <ReactQuill
        value={item.value ?? ""}
        onChange={(content) => onUpdateItem(idx, content)}
        theme="snow" 
        className={styles["quill-editor"]} 
        modules={{ toolbar: toolbarOptions }}
      />
    </div>
    <button
      type="button"
      className={styles.buttonDelete}
      onClick={() => onDeleteItem(idx)}
    >
      <RiDeleteBinLine />
    </button>
  </>)
  }


export default QuillEditorItem;
