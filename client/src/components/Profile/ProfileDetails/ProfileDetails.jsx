import React, { useState } from "react";
import styles from "./ProfileDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchUser } from "../../../utils/http";
import ModalWithMenu from "../ManageProfileDetails/ModalWithMenu";
import { FiSettings } from "react-icons/fi"; // Importowanie ikony

import DefaultProfilePicture from "../../../assets/images/profilePicture.png";
import { url } from "../../../utils/pictures";
import LoadingIndicator from "../../../ui/LoadingIndicator/LoadingIndicator.jsx";
import ErrorContainer from "../../../ui/ErrorContainer/ErrorContainer.jsx";
import { formatShortMonthDate } from "../../../utils/date-conventer";

import { decodeToken } from "react-jwt";
import { getSimpleToken } from "../../../utils/auth.js";

const ProfileDetails = () => {
  const params = useParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const restPoint = "user/" + params.userId;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["profileDetails", params.userId],
    queryFn: ({ signal }) => fetchUser({ signal, restPoint }),
  });
  let token = getSimpleToken();
  let userId = "";
  if (token) {
    userId = decodeToken(token).id;
  }
  let isOwner = false;
  if (userId === params.userId) {
    isOwner = true;
  }
  let content = null;
  if (isPending) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = <ErrorContainer message={error.message} />;
  }
  if (data) {
    const { name, surname, email, description, profilePicture, created } = data;

    let imgSrc = profilePicture ? url + profilePicture : DefaultProfilePicture;
    content = (
      <>
        <div className={styles.header}>
          <img src={imgSrc} alt="Profile" className={styles.profileImage} />
          <div>
            <h2 className={styles.profileName}>
              {name} {surname}
            </h2>
            <span className={styles.joinDate}>
              Joined on {formatShortMonthDate(created)}
            </span>
          </div>
        </div>
        <span className={styles.email}>{email}</span>
        {isOwner && (
          <button
            className={styles.settingsButton}
            onClick={() => setModalVisible(true)}
          >
            <FiSettings />
            Manage My Account
          </button>
        )}
        <div className={styles.description} style={{ whiteSpace: "pre-wrap" }}>
          {description}
        </div>
        {isOwner && (
          <div className={`${styles.linkContainer} ${styles.new}`}>
            <Link to="/articles/new" className={styles.searchInput}>
              Create new article
            </Link>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={styles.profileContainer}>
      {content}
      {isOwner && (
        <ModalWithMenu
          isModalVisible={isModalVisible}
          closeModal={() => setModalVisible(false)}
        />
      )}
    </div>
  );
};

export default ProfileDetails;
