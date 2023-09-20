import React from "react";
import styles from "./ProfileDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../../utils/http";

import DefaultProfilePicture from '../../../assets/images/profilePicture.png'
import { url } from "../../../utils/pictures";
import LoadingIndicator from "../../../ui/LoadingIndicator/LoadingIndicator.jsx";
import ErrorContainer from "../../../ui/ErrorContainer/ErrorContainer.jsx";
import Exit from '../../../ui/Exit/Exit.jsx'
import {formatShortMonthDate} from '../../../utils/date-conventer'
const ProfileDetails = () => {
  const params = useParams();
  const restPoint = "user/" + params.userId;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["profileDetails", params.userId],
    queryFn: ({signal}) => fetchUser({signal,restPoint}),
  });

  
  let content = null;
  if (isPending) {
    content = <LoadingIndicator />;
  }
  if (isError) {
    content = <ErrorContainer message={error.message} />;
  }
  if (data) {
    const{
        name,
        surname,
        email,
        description,
        profilePicture,
        created
    } = data;
    let imgSrc = profilePicture ? url + profilePicture : DefaultProfilePicture
    content = (
      <>
        <div className={styles.header}>
          <img
            src={imgSrc}
            alt="Profile"
            className={styles.profileImage}
          />
          <div>
            <h2 className={styles.profileName}>
              {name} {surname}
            </h2>
            <span className={styles.joinDate}>Joined on {formatShortMonthDate(created)}</span>
          </div>
        </div>
        <span className={styles.email}>{email}</span>
        <p className={styles.description}>{description}</p>
      </>
    );
  }
  return <div className={styles.profileContainer}>
    <Exit path=".."/>
    {content}
    
    </div>;
};

export default ProfileDetails;
