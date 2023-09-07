import { Link } from 'react-router-dom';
import styles from './ErrorContainer.module.css';

const ErrorContainer = (props) => {
    return (
        <div className={styles['error-container']}>
            <h1>{props.title ? props.title : ''}</h1>
            <p>{props.message? props.message: ''}</p>
            <Link to="/">
            <button className={styles.button} onClick={props.onTryAgain}>Go back to the main page</button>
            </Link>
        </div>
    );
}

export default ErrorContainer;