import { Link, useLocation } from 'react-router-dom';
import styles from './ErrorContainer.module.css';

const ErrorContainer = (props) => {
    const location = useLocation();
    let content = null;
    if(location.pathname !== '/' && props.showButton){
        content =(<Link to="/">
        <button className={styles.button} onClick={props.onTryAgain}>Go back to the main page</button>
        </Link>)
    }
    return (
        <div className={styles['error-container']}>
            <h1>{props.title ? props.title : ''}</h1>
            <p>{props.message? props.message: ''}</p>
            {content}
        </div>
    );
}

export default ErrorContainer;