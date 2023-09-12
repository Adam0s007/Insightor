
import styles from './ErrorContainer.module.css';
import {useNavigate} from 'react-router-dom';
const ErrorContainer = (props) => {
    const navgiate = useNavigate();
    let content = null;
    let navMess = props.navigateMessage || 'go to home page';
    const defaultTryAgain = ()=>{
        navgiate('/');
    }
    const tryAgain = props.onTryAgain || defaultTryAgain;
    const showButton = props.showButton === undefined ? true : props.showButton;
    if(props.onTryAgain){
      content = <button className={styles.button} onClick={tryAgain}>{navMess}</button> 
    }
    return (
        <div className={styles['error-container']}>
            <h1>{props.title ? props.title : ''}</h1>
            <p>{props.message? props.message: ''}</p>
            {showButton && <button className={styles.button} onClick={tryAgain}>{navMess}</button> }
        </div>
    );
}

export default ErrorContainer;