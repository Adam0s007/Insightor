import React from 'react';
import styles from './ContactForm.module.css';
import {getSimpleToken} from '../../utils/auth'
import { isExpired, decodeToken } from "react-jwt";

export const ContactForm = () => {
    const token = getSimpleToken();
    
    return(
        <section className={styles['contact-wrapper']}>
        <div  className={styles.contact}>
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
        </div>
        </section>
    )
   
};

