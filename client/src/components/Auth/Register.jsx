import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/input-validators";

import InputField from "./InputField";
const Register = () => {
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

  const {
    value: confirmPasswordValue,
    hasError: confirmPasswordHasError,
    isValid: confirmPasswordIsValid,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value === passwordValue); // Just a simple equality check

  const {
    value: nameValue,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(validateUsername);

  const {
    value: surnameValue,
    hasError: surnameHasError,
    isValid: surnameIsValid,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    reset: resetSurname,
  } = useInput(validateUsername);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formIsValid =
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    nameIsValid &&
    surnameIsValid;

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
        <h2>Sign up!</h2>
        <div className={styles.group}>
          <InputField
            type="text"
            id="name"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            placeholder="Name"
            hasError={nameHasError}
            errorMessage="Your name must be at least 3 characters long and at most 30 characters long."
          />
          <InputField
            type="text"
            id="surname"
            value={surnameValue}
            onChange={surnameChangeHandler}
            onBlur={surnameBlurHandler}
            placeholder="Surname"
            hasError={surnameHasError}
            errorMessage="Your surname must be at least 3 characters long and at most 30 characters long."
          />
        </div>
        <InputField
          type="email"
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          placeholder="email"
          hasError={emailHasError}
          errorMessage="Please enter a valid email."
        />
        <InputField
          type="password"
          id="password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          placeholder="password"
          hasError={passwordHasError}
          errorMessage="The password must contain at least one uppercase and one lowercase letter, as well as a special character."
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <InputField
          type="password"
          id="confirm-password"
          value={confirmPasswordValue}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          placeholder="confirm password"
          hasError={confirmPasswordHasError}
          errorMessage="The password must contain at least one uppercase and one lowercase letter, as well as a special character."
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />
        <div>
          <button
            type="submit"
            disabled={!formIsValid}
            className={styles.button}
          >
            Sign up!
          </button>
        </div>
        <div className={styles.linkWrapper}>
          <Link to="login" className={styles.link}>
            Already have an account? Login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Register;
