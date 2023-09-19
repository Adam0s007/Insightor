import React, { useState, useEffect, useRef } from "react";
import defaultProfileImage from "../../../assets/images/profilePicture.png";
import styles from "./ProfileDetails.module.css";
import { url } from "../../../utils/pictures";
import { useMutation } from "@tanstack/react-query";
import { updateProfilePicture, queryClient } from "../../../utils/http";
import LoadingOverlay from "../../../ui/LoadingOverlay/LoadingOverlay.jsx";

import useModal from '../../../hooks/use-profile-modal'
import useProfileMutation from "../../../hooks/use-profile-mutation";

const ProfilePicture = ({ imageSrc, description }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const updateButtonRef = useRef(null);
  const { 
    showModal, modalMessage, modalType, 
    setModalMessage, setModalType, setShowModal
  } = useModal(3000);

  const mutation = useProfileMutation(updateProfilePicture);

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);
    mutation.mutate(
      { formData },
      {
        onError: () => {
          setModalMessage("Operation failed!");
          setModalType("error");
          setShowModal(true);
        },
        onSuccess: () => {
          setModalMessage("Profile picture has been updated!");
          setModalType("success");
          setShowModal(true);
          setSelectedFile(null);
        },
      }
    );
  };

  useEffect(() => {
    if (selectedFile && updateButtonRef.current) {
      updateButtonRef.current.classList.add(styles.bumpAnimation);
      const timer = setTimeout(() => {
        updateButtonRef.current.classList.remove(styles.bumpAnimation);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedFile]);

  return (
    <div className={styles.profileImageContainer}>
      <div
        className={`${styles.modalMessage} ${showModal ? styles.active : ""} ${
          modalType === "error" ? styles.error : styles.success
        }`}
      >
        {modalMessage}
      </div>
        {mutation.isPending && <LoadingOverlay />}
      <div className={styles.imageContainer}>
        <img
          src={url + imageSrc || defaultProfileImage}
          alt={description || "User profile"}
        />
      </div>
      <label className={styles.uploadLabel}>
        Change Photo 
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </label>
      <span className={styles.attention} >The image must be 2MB or smaller</span>
      {selectedFile && (
        <button
          ref={updateButtonRef}
          className={`${styles.uploadLabel} ${styles.button}`}
          onClick={handleSubmit}
        >
          Update!
        </button>
      )}
    </div>
  );
};

export default ProfilePicture;
