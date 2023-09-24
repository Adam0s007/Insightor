import React from 'react';
import styles from "./ProfileDetails.module.css";
import { FiEdit } from "react-icons/fi";
import AutoExpandTextArea from "../../../ui/AutoExpandTextArea.jsx";

const DescriptionEdit = ({ isEditing, editedFields, handleEditToggle, handleFieldChange, handleFieldSave }) => {
  return (
    <>
      {isEditing.description ? (
        <>
          <AutoExpandTextArea
            value={editedFields.description || ""}
            onChange={(e) =>
              handleFieldChange("description", e.target.value)
            }
            className={styles.textArea}
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
        <div className={styles.description} style={{ whiteSpace: "pre-wrap" }}>
          {editedFields.description || "Describe yourself"}
          <FiEdit
            onClick={() => handleEditToggle("description")}
            style={{ cursor: "pointer", marginLeft: "5px" }}
          />
        </div>
      )}
    </>
  );
};

export default DescriptionEdit;
