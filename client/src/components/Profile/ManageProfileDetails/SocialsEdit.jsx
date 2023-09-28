import React from "react";
import styles from "./SocialsEdit.module.css";
import {
  FiEdit,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiLinkedin,
} from "react-icons/fi";

const icons = {
  facebook: FiFacebook,
  twitter: FiTwitter,
  instagram: FiInstagram,
  youtube: FiYoutube,
  linkedin: FiLinkedin,
};

const SocialsEdit = ({
  isEditing,
  editedFields,
  handleEditToggle,
  handleFieldChange,
  handleFieldSave,
}) => {
  return (
    <div className={styles.editContainer}>
      {isEditing.socials ? (
        <>
          {Object.keys(editedFields.socials).map((platform) => {
            const Icon = icons[platform];
            return (
              <div key={platform} className={styles.socialInputContainer}>
                {Icon && <Icon className={styles.socialIcon} />}
                <input
                  className={styles.editInput}
                  type="text"
                  placeholder={`Enter ${platform} URL`}
                  value={editedFields.socials[platform] || ""}
                  onChange={(e) => handleFieldChange(`socials.${platform}`, e.target.value)}
                />
              </div>
            );
          })}
          <button
            className={styles.save}
            type="button"
            onClick={() => handleFieldSave("socials")}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <FiEdit
            onClick={() => handleEditToggle("socials")}
            className={styles.editIcon}
          />
          {Object.keys(editedFields.socials).map((platform) => {
            const Icon = icons[platform];
            return (
              <div key={platform} className={styles.socialDisplayContainer}>
                {Icon && <Icon className={styles.socialIcon} />}
                <span className={styles.socialURL}>
                  {editedFields.socials[platform] || "Not set"}
                </span>
              </div>
            );
          })}
          
        </>
      )}
    </div>
  );
};

export default SocialsEdit;
