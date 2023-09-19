import React from 'react';
import defaultProfileImage from "../../../assets/images/profilePicture.png";
import styles from "./ProfileDetails.module.css";
import {url} from '../../../utils/pictures';
const ProfilePicture = ({ imageSrc, description }) => (
  <div className={styles.profileImageContainer}>
    <img
      src={url+imageSrc || defaultProfileImage}
      alt={description || "User profile"}
    />
  </div>
);

export default ProfilePicture;
