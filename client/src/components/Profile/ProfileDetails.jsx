import React, { useState, useEffect } from "react";
import styles from "./ProfileDetails.module.css";
import { formatShortMonthDate } from "../../utils/date-conventer";
import defaultProfileImage from "../../assets/images/profilePicture.png"; // Przyjmując, że masz obraz domyślny w tym miejscu
import { FiEdit } from "react-icons/fi";
import AutoExpandTextArea from "../../ui/AutoExpandTextArea.jsx";
import { useMutation } from "@tanstack/react-query";
import { updateUser, queryClient } from "../../utils/http";
import LoadingOverlay from "../../ui/LoadingOverlay/LoadingOverlay.jsx";
const ProfilePicture = ({ imageSrc, description }) => (
  <div className={styles.profileImageContainer}>
    <img
      src={imageSrc || defaultProfileImage}
      alt={description || "User profile"}
    />
  </div>
);

const ProfileDetails = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const { created, email, name, surname, profilePicture, description } =
    props.user;
  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onMutate: async (data) => {
      const fields = data.updatedFields;
      await queryClient.cancelQueries(["profile"]);
      const previousProfile = queryClient.getQueryData(["profile"]);

      const newUserObj = {
        ...previousProfile,
        ...fields,
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
      console.log("TAK!");
      setModalMessage("Your data has been updated!"); // Przykładowa wiadomość
      setModalType("success");
      setShowModal(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
  const [isEditing, setIsEditing] = useState({
    name: false,
    surname: false,
    description: false,
  });

  const [editedFields, setEditedFields] = useState({
    name: name,
    surname: surname,
    description: description,
  });

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleFieldChange = (field, value) => {
    setEditedFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFieldSave = (field) => {
    if (editedFields[field] !== props.user[field]) {
      mutate(
        { updatedFields: editedFields },
        {
          onError: () => {
            setEditedFields((prev) => ({
              ...prev,
              [field]: props.user[field],
            }));
          },
        }
      );
    }
    handleEditToggle(field);
  };

  useEffect(() => {
    if (showModal) {
      const timeoutId = setTimeout(() => {
        setShowModal(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showModal]);

  return (
    <div className={styles.profileContainer}>
      <div
        className={`${styles.modalMessage} ${showModal ? styles.active : ""} ${
          modalType === "error" ? styles.error : styles.success
        }`}
      >
        
        {modalMessage}
      </div>
      {isPending && <LoadingOverlay />}
      <div className={styles.containerInfo}>
        <ProfilePicture
          imageSrc={props.profilePicture}
          description={"User profile"}
        />
        <div className={styles.profileDetails}>
          <div className={styles.editContainer}>
            {isEditing.name || isEditing.surname ? (
              <>
                <input
                  className={styles.editInput}
                  type="text"
                  value={editedFields.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  onBlur={() => {
                    handleFieldSave("name");
                    handleFieldSave("surname");
                  }}
                />
                <input
                  className={styles.editInput}
                  type="text"
                  value={editedFields.surname}
                  onChange={(e) => handleFieldChange("surname", e.target.value)}
                  onBlur={() => {
                    handleFieldSave("surname");
                    handleFieldSave("name");
                  }}
                />
                <button
                  className={styles.save}
                  type="button"
                  onClick={() => {
                    handleFieldSave("name");
                    handleFieldSave("surname");
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className={styles.fullName}>{editedFields.name}</p>
                <p className={styles.fullName}>{editedFields.surname}</p>
                <FiEdit
                  onClick={() => {
                    handleEditToggle("surname");
                    handleEditToggle("name");
                  }}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </>
            )}
          </div>

          {isEditing.description ? (
            <>
              <AutoExpandTextArea
                value={editedFields.description || ""}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                maxLength={300} // Przykładowa maksymalna długość, dostosuj według potrzeb
                className={styles.textArea} // Jeśli masz style dla tego komponentu
              />
              <button
                className={styles.save}
                type="button"
                onClick={() => {
                  handleFieldSave("description");
                }}
              >
                Save
              </button>
            </>
          ) : (
            <p className={styles.description}>
              {editedFields.description || "Describe yourself"}
              <FiEdit
                onClick={() => handleEditToggle("description")}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
            </p>
          )}

          <p className={styles.email}>{email}</p>
          <p className={styles.creationDate}>
            created {formatShortMonthDate(created)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
