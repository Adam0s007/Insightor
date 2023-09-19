import React, { useState, useEffect, useRef } from "react";
import defaultProfileImage from "../../../assets/images/profilePicture.png";
import styles from "./ProfileDetails.module.css";
import { url } from "../../../utils/pictures";
import { useMutation } from "@tanstack/react-query";
import { updateProfilePicture, queryClient } from "../../../utils/http";
import LoadingOverlay from "../../../ui/LoadingOverlay/LoadingOverlay.jsx";
const ProfilePicture = ({ imageSrc, description }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const updateButtonRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfilePicture,
    onMutate: async (data) => {
      const fields = data.formData;
      await queryClient.cancelQueries(["profile"]);
      const previousProfile = queryClient.getQueryData(["profile"]);

      const newUserObj = {
        ...previousProfile,
        profilePicture: selectedFile.name,
      };
      queryClient.setQueryData(["profile"], newUserObj);
      return { previousProfile };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["profile"], context.previousProfile);
      setModalMessage("Operation failed!"); // Przykładowa wiadomość
      setModalType("error");
      setShowModal(true);
    },
    onSuccess: (data) => {
      setModalMessage("Profile picture has been updated!"); // Przykładowa wiadomość
      setModalType("success");
      setShowModal(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    console.log("formData:", formData);
    mutate({ formData });
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

  useEffect(() => {
    if (showModal) {
      const timeoutId = setTimeout(() => {
        setShowModal(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showModal]);

  return (
    <div className={styles.profileImageContainer}>
      <div
        className={`${styles.modalMessage} ${showModal ? styles.active : ""} ${
          modalType === "error" ? styles.error : styles.success
        }`}
      >
        {modalMessage}
      </div>
        {isPending && <LoadingOverlay />}
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
