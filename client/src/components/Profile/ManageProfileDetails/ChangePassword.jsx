import React, { useState } from "react";
import useInput from "../../../hooks/use-input";
import styles from "./ChangePassword.module.css";

import { FiEye, FiEyeOff } from "react-icons/fi";
const validatePassword = (value) => {
  const trimmedValue = value.trim();
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(
    trimmedValue
  );
};

const ChangePassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    value: currentPassword,
    hasError: currentPasswordHasError,
    valueChangeHandler: currentPasswordChangeHandler,
    inputBlurHandler: currentPasswordBlurHandler,
    reset: resetCurrentPassword,
  } = useInput(() => true);

  const {
    value: newPassword,
    hasError: newPasswordHasError,
    isValid: newPasswordIsValid,
    valueChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPassword,
  } = useInput(validatePassword);

  const confirmNewPasswordValidation = (value) => newPassword === value;

  const {
    value: confirmNewPassword,
    hasError: confirmNewPasswordHasError,
    isValid: confirmNewPasswordIsValid,
    valueChangeHandler: confirmNewPasswordChangeHandler,
    inputBlurHandler: confirmNewPasswordBlurHandler,
    reset: resetConfirmNewPassword,
  } = useInput(confirmNewPasswordValidation);

  const isValid =
    newPasswordIsValid &&
    confirmNewPasswordIsValid &&
    currentPassword.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      return;
    }
    resetCurrentPassword();
    resetNewPassword();
    resetConfirmNewPassword();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="current-password" className={styles.label}>
        Current Password
      </label>
      <div className={styles.inputWrapper}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={currentPassword}
          id="current-password"
          onChange={currentPasswordChangeHandler}
          onBlur={currentPasswordBlurHandler}
          className={styles.input}
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.eyeIcon}
        >
          {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {currentPasswordHasError && currentPassword.trim() === "" && (
        <p className={styles.errorText}>Please enter your current password.</p>
      )}

      <label htmlFor="new-password" className={styles.label}>
        New Password
      </label>
      <div className={styles.inputWrapper}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={newPassword}
          id="new-password"
          onChange={newPasswordChangeHandler}
          onBlur={newPasswordBlurHandler}
          className={`${styles.input} ${
            newPasswordHasError ? styles.error : ""
          }`}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.eyeIcon}
        >
          {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {newPasswordHasError && (
        <p className={styles.errorText}>
          The password must contain at least one uppercase letter, one lowercase
          letter, and one special character.
        </p>
      )}

      <label htmlFor="confirm-password" className={styles.label}>
        Confirm password
      </label>
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={confirmNewPassword}
        id="confirm-password"
        onChange={confirmNewPasswordChangeHandler}
        onBlur={confirmNewPasswordBlurHandler}
        className={`${styles.input} ${
          confirmNewPasswordHasError ? styles.error : ""
        }`}
        autoComplete="new-password"
      />
      {confirmNewPasswordHasError && (
        <p className={styles.errorText}>Passwords must be the same.</p>
      )}

      <button
        type="submit"
        className={`${styles.button} ${!isValid ? styles.disabled : ""}`}
        disabled={!isValid}
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePassword;
