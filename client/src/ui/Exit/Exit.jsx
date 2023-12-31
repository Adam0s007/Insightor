import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./Exit.module.css";

const Exit = (props) => {
  const path = props.path || "#";
  const classes = props.className || "";
  return (
    <div className={`${classes} ${styles.returnPage}`}>
      <Link to={path} className={styles.returnNav} onClick={props.onClick}>
        <AiOutlineArrowLeft />
      </Link>
    </div>
  );
};

export default Exit;
