import React from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledMain = styled("main")`
  flex-grow: 2;
  position: relative;
  min-width: 1024px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledToastContainer = styled(ToastContainer)`
  position: absolute;
`;

function Main({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <StyledMain>
      {children}
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
    </StyledMain>
  );
}

export default Main;
