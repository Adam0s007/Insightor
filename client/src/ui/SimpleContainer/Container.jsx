import styles from './Container.module.css'
const Container = (props) =>{
    const classes = props.classes ? `${styles.container} ${props.classes}` : styles.container;
    return (
        <div className={classes}>
            {props.children}
        </div>
    )

}
export default Container;