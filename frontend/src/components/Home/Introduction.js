import React from 'react';
import styles from './Introduction.module.css';
import animations from './Animations.module.css';
export const Introduction = ({
    paragraphRef, 
    howItWorksRef, 
    paragraphIsVisible, 
    howItWorksIsVisible
}) => (
    <section className={styles.introduction}>
        <p ref={paragraphRef} className={paragraphIsVisible ? animations.animateVisible : ""}>
            Expand yourself and share your thoughts...
        </p>
        <div ref={howItWorksRef} className={`${styles["how-it-works"]} ${howItWorksIsVisible ? animations.animateVisibleRight : ""}`}>
            <h2>How Insightor Works:</h2>
            <ul>
                <li>Publish Your Blog</li>
                <li>Rate and Comment: Your opinion matters!</li>
                <li>Be Part of the Community: Everyone has a voice in Insightor.</li>
            </ul>
        </div>
    </section>
);


