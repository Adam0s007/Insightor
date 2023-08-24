import React from 'react';
import styles from './Home.module.css';

export const Introduction = ({
    paragraphRef, 
    howItWorksRef, 
    paragraphIsVisible, 
    howItWorksIsVisible
}) => (
    <section className={styles.introduction}>
        <p ref={paragraphRef} className={paragraphIsVisible ? styles.animateVisible : ""}>
            Expand yourself and share your thoughts...
        </p>
        <div ref={howItWorksRef} className={`${styles["how-it-works"]} ${howItWorksIsVisible ? styles.animateVisibleRight : ""}`}>
            <h2>How Insightor Works:</h2>
            <ul>
                <li>Publish Your Blog</li>
                <li>Rate and Comment: Your opinion matters!</li>
                <li>Be Part of the Community: Everyone has a voice in Insightor.</li>
            </ul>
        </div>
    </section>
);


