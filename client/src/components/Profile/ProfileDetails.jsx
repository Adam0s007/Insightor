import React from 'react';
import styles from './ProfileDetails.module.css';
import { formatShortMonthDate } from "../../utils/date-conventer";
import defaultProfileImage from "../../assets/images/profilePicture.png"; // Przyjmując, że masz obraz domyślny w tym miejscu

const ProfilePicture = ({ imageSrc, description }) => (
    <div className={styles.profileImageContainer}>
      <img
        src={imageSrc || defaultProfileImage}
        alt={description || "User profile"}
      />
      {description && <p>{description}</p>}
    </div>
  );

const ProfileDetails = (props)=>{
    const {
        created,
        email,
        name,
        surname,
        profilePicture,
        description,
      } = props
    return (
        <div className={styles.profileContainer}>
          <div className={styles.containerInfo}>
            <ProfilePicture imageSrc={profilePicture} description={description} />
            <div className={styles.profileDetails}>
              <p className={styles.fullName}>
                {name} {surname}
              </p>
              <p className={styles.email}>{email}</p>
              <p className={styles.description}>
                {description}
                Lorem ipsum dolor sit amet, consectetur adip inc commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officiaLorem ipsum dolor sit amet.
                
              </p>
              <p className={styles.creationDate}>created {formatShortMonthDate(created)}</p>
            </div>
          </div>
        </div>
      );
}

export default ProfileDetails;
