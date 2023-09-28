import React, { useState, useEffect } from "react";
import styles from "./ProfileDetails.module.css";
import { formatShortMonthDate } from "../../../utils/date-conventer";
import { useMutation } from "@tanstack/react-query";
import { updateUser, queryClient } from "../../../utils/http";
import LoadingOverlay from "../../../ui/LoadingOverlay/LoadingOverlay.jsx";
import ProfilePicture from "./ProfilePicture.jsx";
import NameSurnameEdit from "./NameSurnameEdit.jsx";
import DescriptionEdit from "./DescriptionEdit.jsx";
import SocialsEdit from "./SocialsEdit.jsx";
import useModal from "../../../hooks/use-profile-modal";
import useProfileMutation from "../../../hooks/use-profile-mutation";

const ProfileDetails = (props) => {
  const {
    created,
    email,
    name,
    surname,
    profilePicture,
    description,
    socials,
  } = props.user;

  const {
    showModal,
    modalMessage,
    modalType,
    setModalMessage,
    setModalType,
    setShowModal,
  } = useModal(3000);

  const mutation = useProfileMutation(updateUser);

  const [isEditing, setIsEditing] = useState({
    name: false,
    surname: false,
    description: false,
    socials: false,
  });

  const [editedFields, setEditedFields] = useState({
    name: name,
    surname: surname,
    description: description,
    socials: {...socials},
  });

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleFieldChange = (field, value) => {
    setEditedFields((prev) => {
      // Sprawdzenie, czy aktualizujemy zagnieżdżone pole
      if (field.includes('.')) {
        const [parentField, childField] = field.split('.');
        return {
          ...prev,
          [parentField]: {
            ...prev[parentField],
            [childField]: value,
          },
        };
      } else {
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };
  

  const handleFieldSave = (field) => {
    console.log(editedFields)
    if (editedFields[field] !== props.user[field]) {
      mutation.mutate(
        { updatedFields: editedFields },
        {
          onError: () => {
            setEditedFields((prev) => ({
              ...prev,
              [field]: props.user[field],
            }));
            setModalMessage("Operation failed!");
            setModalType("error");
            setShowModal(true);
          },
          onSuccess: () => {
            setModalMessage("Your data has been updated!");
            setModalType("success");
            setShowModal(true);
          },
        }
      );
    }
    handleEditToggle(field);
  };

  const isPending = mutation.isPending;
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
          imageSrc={profilePicture}
          description={"User profile"}
        />

        <div className={styles.profileDetails}>
          <NameSurnameEdit
            isEditing={isEditing}
            editedFields={editedFields}
            handleEditToggle={handleEditToggle}
            handleFieldChange={handleFieldChange}
            handleFieldSave={handleFieldSave}
          />
          <p className={styles.email}>{email}</p>
          <DescriptionEdit
            isEditing={isEditing}
            editedFields={editedFields}
            handleEditToggle={handleEditToggle}
            handleFieldChange={handleFieldChange}
            handleFieldSave={handleFieldSave}
          />
          <SocialsEdit
            isEditing={isEditing}
            editedFields={editedFields}
            handleEditToggle={handleEditToggle}
            handleFieldChange={handleFieldChange}
            handleFieldSave={handleFieldSave}
          />

          <p className={styles.creationDate}>
            created {formatShortMonthDate(created)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
