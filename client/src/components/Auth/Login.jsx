import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/input-validators";

import InputField from "./InputField";

const Login = () => {
  const {
    value: emailValue,
    valueChangeHandler: emailChangeHandler,
    reset: resetEmail,
  } = useInput(validateEmail);

  const {
    value: passwordValue,
    valueChangeHandler: passwordChangeHandler,
    reset: resetPassword,
  } = useInput(validatePassword);

  const [showPassword, setShowPassword] = useState(false);
  const formIsValid = emailValue.trim() !== '' && passwordValue.trim() !== '';

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
        <InputField
          type="email"
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          placeholder="email"
        />
        <InputField
          type="password"
          id="password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          placeholder="password"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
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
