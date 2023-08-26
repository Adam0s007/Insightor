import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
 function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.address}>
                <p>Address: [Street and Number], [Postal Code], [City], [Country]</p>
                <p>Email: contact@insightor.com</p>
                <p>Phone: +48 123 456 789</p>
            </div>
            <div className={styles["social-media"]}>
                <a href="#facebook"><FaFacebook /></a>
                <a href="#instagram"><FaInstagram /></a>
                <a href="#twitter"><FaTwitter /></a>
                <a href="#linkedin"><FaLinkedin /></a>
            </div>
            <div className={styles["useful-links"]}>
                <a href="#terms">Terms of Service</a>
                <a href="#privacy">Privacy Policy</a>
                <a href="#faq">FAQ</a>
            </div>
            <p>© 2023 Insightor. All rights reserved.</p>
        </footer>
    );
}

export default Footer;