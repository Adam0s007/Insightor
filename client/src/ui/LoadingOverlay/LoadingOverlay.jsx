import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import styles from "./LoadingOverlay.module.css";
const LoadingOverlay = () => {
  return (
    <div className={styles.overlay}>
      <LoadingIndicator />
    </div>
  );
};

export default LoadingOverlay;
