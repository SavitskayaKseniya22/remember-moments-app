import React from "react";
import styled from "styled-components";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./components/Router";
import { GlobalStyle } from "./styledComponents/GlobalStyle";
import "react-toastify/dist/ReactToastify.css";

const StyledToastContainer = styled(ToastContainer)`
  position: absolute;
`;

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle />
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
    </>
  );
}

export default App;
