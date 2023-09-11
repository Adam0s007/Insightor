import { useLocation } from "react-router-dom";

export const useStatusModal = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const status = params.get('status');

  let modalMessage;
  let type = "success"; // defaulting to success, as all current messages are of type success

  switch (status) {
    case 'logged-in':
      modalMessage = "You have successfully logged in";
      break;
    case 'signed-up':
      modalMessage = "You have successfully signed up";
      break;
    case 'loggedout':
      modalMessage = "You have successfully logged out";
      break;
    default:
      modalMessage = null;
  }

  return { modalMessage, type,location };
};
