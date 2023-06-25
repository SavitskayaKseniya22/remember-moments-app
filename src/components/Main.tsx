import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledMain = styled("main")`
  flex-grow: 2;
  position: relative;
`;

const StyledToastContainer = styled(ToastContainer)`
  position: absolute;

  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;

function Main({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <StyledMain>
      <StyledToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable
        theme="light"
        newestOnTop
      />
      {children}
    </StyledMain>
  );
}

export default Main;
