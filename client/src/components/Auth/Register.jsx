import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Auth.module.css";
import { Link,useNavigate,useNavigation,Form,useActionData } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/input-validators";

import InputField from "./InputField";
import Container from '../../ui/SimpleContainer/container';
import LoadingOverlay from "../../ui/LoadingOverlay/LoadingOverlay";

const Register = (props) => {
  const data = useActionData();
  console.log(data);
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('/');
  }
  
  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(validatePassword);

  const {
    value: confirmPasswordValue,
    hasError: confirmPasswordHasError,
    isValid: confirmPasswordIsValid,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => value === passwordValue); // Just a simple equality check

  const {
    value: nameValue,
    hasError: nameHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(validateUsername);

  const {
    value: surnameValue,
    hasError: surnameHasError,
    isValid: surnameIsValid,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
  } = useInput(validateUsername);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formIsValid =
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    nameIsValid &&
    surnameIsValid;

   

  return (
    <section className={styles.section}>
      <Container classes={styles.container}>
      <Form method="post" action="/auth">
      {isSubmitting && <LoadingOverlay/>}
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
        <input type="hidden" name="authType" value="register" />
          <button 
            type="submit"
            disabled={!formIsValid || isSubmitting}
            className={styles.button}
          >
          {isSubmitting ? 'Submitting...' : 'Sign up'}
          </button>
        </div>
        <div className={styles.linkWrapper}>
          <Link to="/auth/login" className={styles.link} >
            Already have an account? Login
          </Link>
        </div>
      </Form>
      </Container>
    </section>
  );
};

export default Register;
