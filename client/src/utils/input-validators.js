export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email) && email.trim().length > 0;
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;
  return passwordRegex.test(password) && password.trim().length > 0;
};

export const validateUsername = (username) => { // 
  return  username.trim().length >= 3 && username.trim().length <= 30;
}