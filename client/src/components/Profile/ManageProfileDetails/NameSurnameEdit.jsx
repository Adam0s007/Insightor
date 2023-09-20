import React from "react";
import styles from "./ProfileDetails.module.css";
import { FiEdit } from "react-icons/fi";

const NameSurnameEdit = ({
  isEditing,
  editedFields,
  handleEditToggle,
  handleFieldChange,
  handleFieldSave,
}) => {
  return (
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
          <p className={styles.fullName}>
            <FiEdit
              onClick={() => {
                handleEditToggle("surname");
                handleEditToggle("name");
              }}
              style={{ cursor: "pointer", marginLeft: "5px" }}
            />
          </p>
        </>
      )}
    </div>
  );
};

export default NameSurnameEdit;
