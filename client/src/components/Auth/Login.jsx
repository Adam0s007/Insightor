import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Auth.module.css"; 
import { Link } from 'react-router-dom';
import { validateEmail,validatePassword } from '../../utils/input-validators'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import InputField from "./InputField";



const Login = () => {
  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(validatePassword);


  const [showPassword, setShowPassword] = useState(false);
  const formIsValid = emailIsValid && passwordIsValid && confirmPasswordIsValid;

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("Logged in:", emailValue, passwordValue);
    resetEmail();
    resetPassword();
    resetConfirmPassword();
  };

  return (
    <section className={styles.section}>
      <form onSubmit={submitHandler} className={styles.container}>
        <h2>Login</h2>
        <div>
          <input
            placeholder="email"
            type="email"
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            className={styles.input}
          />
          {emailHasError && (
            <p className={styles.errorMessage}>Please enter a valid email.</p>
          )}
        </div>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            className={styles.input}
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        {passwordHasError && (
          <p className={styles.errorMessage}>
            The password must contain at least one uppercase and one lowercase
            letter, as well as a special character.
          </p>
        )}
        <div>
          <button
            type="submit"
            disabled={!formIsValid}
            className={styles.button}
          >
            Login
          </button>
        </div>
        <div className={styles.linkWrapper}>
            <Link to="/register" className={styles.link}>
                Register
            </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
