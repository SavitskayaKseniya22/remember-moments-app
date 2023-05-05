import React from "react";
import "./App.css";
import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";
import { Header } from "./components/Header";
import background from "./assets/images/landscape.jpg";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    width: 100vw;
    height: 100vh;
    background: no-repeat center url(${background});
    background-size: cover;
  }
`;

function App() {
  return (
    <div className="App">
      <Header />
      <GlobalStyle />
    </div>
  );
}

export default App;
