
import styles from './Auth.module.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
const InputField = (props) => (
    <div className={styles.groupColumn}>
      <div className={styles.passwordWrapper}>
        <input
          type={props.showPassword ? "text" : props.type}
          id={props.id}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className={styles.input}
        />
        {props.type === "password" && (
          <span
            className={styles.eyeIcon}
            onClick={() => props.setShowPassword(!props.showPassword)}
          >
            {props.showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        )}
      </div>
      {props.hasError && <p className={styles.errorMessage}>{props.errorMessage}</p>}
    </div>
  );

export default InputField;
  