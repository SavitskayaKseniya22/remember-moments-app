import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { StyledBasicButton } from "../styledComponents/SharedStyles";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <StyledBasicButton
        type="button"
        $view="full"
        onClick={() => {
          navigate("/");
        }}
      >
        Return to main page
      </StyledBasicButton>
    </div>
  );
}

export default ErrorPage;
