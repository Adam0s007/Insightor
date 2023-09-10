import { useRouteError, Outlet,useNavigate} from "react-router-dom";

import Container from "../ui/SimpleContainer/Container";
import ErrorContainer from "../ui/ErrorContainer/ErrorContainer";
function AuthErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);
  let title = "An error occurred!";
  const tryAgainHandler = () => {
     navigate("/auth/login");
  };
  return (
    <>
      <div className="container">
        <Container>
        <ErrorContainer
          title={title}
          navigateMessage={"try again"}
          message={'invalid password or email :('}
          onTryAgain={tryAgainHandler}
        />
        </Container>
      </div>
      <Outlet />
    </>
  );
}

export default AuthErrorPage;
