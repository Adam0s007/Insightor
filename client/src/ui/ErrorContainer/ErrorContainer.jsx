
import styles from './ErrorContainer.module.css';

const ErrorContainer = (props) => {
    let content = null;
    let navMess = props.navigateMessage || 'go to home page';
    if(props.onTryAgain){
      content = <button className={styles.button} onClick={props.onTryAgain}>{navMess}</button> 
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