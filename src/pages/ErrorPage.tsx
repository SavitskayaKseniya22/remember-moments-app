import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  const navigate = useNavigate();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <button
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Return to main page
      </button>
    </div>
  );
}

export default ErrorPage;
