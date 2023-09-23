import React, { useRef, useState } from "react";
import styles from "./ImageUpload.module.css";
import {url} from '../../../utils/pictures'
const ImageUpload = (props) => {
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(props.value ? url+props.value : null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 2 * 1024 * 1024) {
      setError("File is too large. Maximum size is 2MB.");
      setPreview(null);
    } else {
      setError(null);
      if (file) {
        const formData = new FormData();
        formData.append("imgUrl", file);
        const url = URL.createObjectURL(file);
        setPreview(url);
        props.onImageSelected(formData);
      }
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="image-upload">
        Upload Thumbnail (Max 2MB)
      </label>
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        ref={fileInputRef}
        onChange={handleImageChange}
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
      {preview && <img src={preview} alt="preview" className={styles.previewImage} />}
    </div>
  );
};

export default ImageUpload;
