import React from 'react';
import defaultProfileImage from "../../../assets/images/profilePicture.png";
import styles from "./ProfileDetails.module.css";

const ProfilePicture = ({ imageSrc, description }) => (
  <div className={styles.profileImageContainer}>
    <img
      src={imageSrc || defaultProfileImage}
      alt={description || "User profile"}
    />
  </div>
);

export default ProfilePicture;
