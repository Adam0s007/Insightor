import React from 'react';
import styles from './Home.module.css';

export const Contact = React.forwardRef(({ isVisible }, ref) => (
    <section ref={ref} className={`${styles.contact} ${isVisible ? styles.animateVisibleRight : ""}`}>
        <h2>Contact Us:</h2>
        <form>
            <label>
                Full Name:
                <input type="text" name="name" />
            </label>
            <label>
                Email Address:
                <input type="email" name="email" />
            </label>
            <label>
                Message:
                <textarea name="message"></textarea>
            </label>
            <input type="submit" value="Send" />
        </form>
        <p>
            By submitting the form, you agree to the processing of your data...
        </p>
    </section>
));

