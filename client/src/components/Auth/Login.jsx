import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import styles from "./Auth.module.css";
import { Link,useNavigate,useNavigation,Form } from "react-router-dom";
import { validateEmail, validatePassword } from "../../utils/input-validators";
import InputField from "./InputField";
import Container from '../../ui/SimpleContainer/container.jsx'
import Logo from '../../ui/Logo'
import LoadingOverlay from "../../ui/LoadingOverlay/LoadingOverlay";
const Login = (props) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('/');
  }
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
  const formIsValid = emailValue.trim() !== "" && passwordValue.trim() !== "";

  return (
    <>
   
    <section className={styles.section}>
      <Container classes={styles.container}>
      <Form method="post" action="/auth">
      {isSubmitting && <LoadingOverlay/>}
      <Logo/>
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
          <input type="hidden" name="authType" value="login" />
          <button
            type="submit"
            disabled={!formIsValid || isSubmitting}
            className={styles.button}
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </div>
        <div className={styles.linkWrapper}>
          <Link to="/auth/register" className={styles.link}>
            Don't have an account? Sign up!
          </Link>
        </div>
      </Form>
      </Container>
    </section>
    </>
  );
};

export default Login;
