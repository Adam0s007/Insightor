
import React, { useRef, useEffect } from "react";
import styles from './AutoExpandTextArea.module.css'
const AutoExpandTextArea = (props) => {
  const textareaRef = useRef(null);

  const resizeTextArea = () => {
    const textArea = textareaRef.current;
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  useEffect(() => {
    const textArea = textareaRef.current;

    textArea.addEventListener("input", resizeTextArea);
    window.addEventListener("resize", resizeTextArea);

    // Wywołaj raz przy montowaniu, aby dostosować wysokość
    resizeTextArea();

    return () => {
      textArea.removeEventListener("input", resizeTextArea);
      window.removeEventListener("resize", resizeTextArea);
    };
  }, []);

  return (
    <textarea 
      ref={textareaRef}
      value={props.value}
      id={props.id}
      onChange={props.onChange}
      maxLength={props.maxLength}
      type={props.type}
      placeholder={props.placeholder}
      className={`${styles.textArea} ${props.className}`}
      defaultValue={props.defaultValue}
      style={{ overflow: "hidden", resize: "none" }}
    ></textarea>
  );
};

export default AutoExpandTextArea;
