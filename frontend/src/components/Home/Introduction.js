import React from 'react';
import styles from './Introduction.module.css';
import animations from './Animations.module.css';
import introImage from '../../assets/images/introduction.png';
export const Introduction = ({
    paragraphRef, 
    howItWorksRef, 
    paragraphIsVisible, 
    howItWorksIsVisible
}) => (
    <section className={styles.introduction}>
        <img src={introImage} alt="Introduction" />
        
        <div ref={howItWorksRef} className={`${styles["how-it-works"]} ${howItWorksIsVisible ? animations.animateVisibleRight : ""}`}>
            
            <ul>
                <li>Publish Your Blog</li>
                <li>Rate and Comment: Your opinion matters!</li>
                <li>Be Part of the Community: Everyone has a voice in Insightor.</li>
            </ul>
            <p ref={paragraphRef} className={`${styles.paragraph} ${paragraphIsVisible ? animations.animateVisibleRight : ""}`}>
            Expand yourself and share your thoughts...
            </p>
        </div>
    </section>
);


