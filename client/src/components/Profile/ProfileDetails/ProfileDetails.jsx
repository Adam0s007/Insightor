import React, { useState, useEffect } from "react";
import styles from "./ProfileDetails.module.css";
import { formatShortMonthDate } from "../../../utils/date-conventer";
import { useMutation } from "@tanstack/react-query";
import { updateUser, queryClient } from "../../../utils/http";
import LoadingOverlay from "../../../ui/LoadingOverlay/LoadingOverlay.jsx";
import ProfilePicture from "./ProfilePicture.jsx";
import NameSurnameEdit from "./NameSurnameEdit.jsx";
import DescriptionEdit from "./DescriptionEdit.jsx";

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

          <p className={styles.creationDate}>
            created {formatShortMonthDate(created)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
