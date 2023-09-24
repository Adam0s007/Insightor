import React, { useState, useRef } from "react";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import styles from "./Profile.module.css";
import { CSSTransition } from "react-transition-group";
import { FaSignOutAlt } from "react-icons/fa";
import { Form } from "react-router-dom";

const animationTiming = {
  enter: 800,
  exit: 900,
};

const Profile = ({ user, onExit }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const profileDetailsRef = useRef(null);
  const changePasswordRef = useRef(null);

  if (!user || !user.data) return <div>Oh God its empty, wait a sec...</div>;

  const changeDisplayedItem = (state) => {
    if (selectedMenuItem === state) {
      setSelectedMenuItem(null);
    } else {
      setSelectedMenuItem(state);
    }
  };

  const menuClickHandler = (e) => {
    switch (e.target.innerText) {
      case "Profile details":
        changeDisplayedItem("ProfileDetails");
        break;
      case "Change Password":
        changeDisplayedItem("ChangePassword");
        break;
      default:
        break;
    }
  };

  return (
    <ul className={styles.menu}>
      <li className={styles.menuItem} onClick={menuClickHandler}>
        Profile details
      </li>

      <CSSTransition
        nodeRef={profileDetailsRef}
        in={selectedMenuItem === "ProfileDetails"}
        mountOnEnter
        unmountOnExit
        timeout={animationTiming}
        classNames={{
          enter: "",
          enterActive: styles.MenuOpen,
          exit: "",
          exitActive: styles.MenuClosed,
        }}
      >
        <div className={styles.newContent} ref={profileDetailsRef}>
          <ProfileDetails user={user.data} />
        </div>
      </CSSTransition>
      
      <li className={styles.menuItem} onClick={menuClickHandler}>
        Change Password
      </li>
      
      <CSSTransition
        nodeRef={changePasswordRef}
        in={selectedMenuItem === "ChangePassword"}
        mountOnEnter
        unmountOnExit
        timeout={animationTiming}
        classNames={{
          enter: "",
          enterActive: styles.MenuOpen,
          exit: "",
          exitActive: styles.MenuClosed,
        }}
      >
        <div className={styles.newContent} ref={changePasswordRef}>
          <ChangePassword />
        </div>
      </CSSTransition>
      
      {/* <li className={styles.menuItem}>Settings</li> */}
      
      <Form className={styles.menuItem} action="/logout" method="post">
        <button onClick={onExit}>
          <div className={styles.icon}>
            <FaSignOutAlt />
          </div>
          Logout
        </button>
      </Form>
    </ul>
  );
};

export default Profile;
