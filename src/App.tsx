import React from "react";
import { RouterProvider } from "react-router-dom";

import router from "./components/Router";
import { GlobalStyle } from "./styledComponents/GlobalStyle";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyle />
    </>
  );
}

export default App;
