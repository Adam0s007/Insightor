import { useRouteError, Outlet,useNavigate} from "react-router-dom";

import Container from "../ui/SimpleContainer/Container";
import ErrorContainer from "../ui/ErrorContainer/ErrorContainer";
function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  let title = "An error occurred!";
  const tryAgainHandler = () => {
     navigate("/");
  };
  return (
    <>
      <div className="max_container">
        <Container>
        <ErrorContainer
          title={title}
          navigateMessage={"go to home page"}
          message={'Something went wrong :('}
          onTryAgain={tryAgainHandler}
        />
        </Container>
      </div>
      <Outlet />
    </>
  );
}

export default ErrorPage;
