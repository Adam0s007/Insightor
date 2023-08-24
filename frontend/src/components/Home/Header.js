import React from 'react';
import styles from './Home.module.css';

export const Header = React.forwardRef(({ isVisible }, ref) => (
    <header ref={ref} className={`${styles.header} ${isVisible ? styles.animateVisible : ""}`}>
        <h1>Welcome to Insightor – Your Source of New Perspectives!</h1>
        <blockquote className={styles["motivational-quote"]}>
            "The whole world is hidden in one sentence. Infinity lies in one glance. Discover, learn, and share in Insightor."
        </blockquote>
    </header>
));


