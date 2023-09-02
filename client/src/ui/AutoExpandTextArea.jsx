// AutoExpandTextArea.js
import React, { useRef, useEffect } from "react";

const AutoExpandTextArea = ({ value, onChange, className, maxLength, type }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textArea = textareaRef.current;
    const resizeTextArea = () => {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    };

    textArea.addEventListener("input", resizeTextArea);
    return () => textArea.removeEventListener("input", resizeTextArea);
  }, []);

  return (
    <textarea 
      ref={textareaRef}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      type={type}
      className={className}
      style={{ overflow: "hidden", resize: "none" }}
    ></textarea>
  );
};

export default AutoExpandTextArea;
