import React from "react";
import { Link } from "react-router-dom";
import styles from "./Contact.module.css";
import animations from "./Animations.module.css";

export const Contact = ({
  paragraphRef,
  howItWorksRef,
  paragraphIsVisible,
  howItWorksIsVisible,
}) => {
  return (
    <section className={styles.introduction}>
      <div
        ref={howItWorksRef}
        className={`${styles["how-it-works"]} ${
          howItWorksIsVisible ? animations.animateVisible : ""
        }`}
      >
        <h1
          className={`${styles.paragraph} ${
            paragraphIsVisible ? animations.animateVisible : ""
          }`}
        >
          WE'D LOVE TO HEAR FROM YOU
        </h1>
        <p
          ref={paragraphRef}
          className={`${styles.paragraph} ${
            paragraphIsVisible ? animations.animateVisible : ""
          }`}
        >
          Every message, question, or feedback we receive is a step towards
          making our service even better. We're eager to connect with you.
          <Link to="contact" className={styles.buttonContainer}>
            <button className={styles.button}>Contact Us</button>
          </Link>
        </p>
      </div>
    </section>
  );
};
