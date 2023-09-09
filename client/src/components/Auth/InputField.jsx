
import styles from './Auth.module.css'
const InputField = ({ 
    type, 
    id, 
    value, 
    onChange, 
    onBlur, 
    placeholder, 
    hasError, 
    errorMessage, 
    showPassword, 
    setShowPassword 
  }) => (
    <>
      <div className={styles.passwordWrapper}>
        <input
          type={showPassword ? "text" : type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.input}
        />
        {type === "password" && (
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        )}
      </div>
      {hasError && <p className={styles.errorMessage}>{errorMessage}</p>}
    </>
  );

export default InputField;
  