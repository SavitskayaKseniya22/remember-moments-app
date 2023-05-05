import React from "react";
import "./App.css";
import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";
import { Time } from "./components/Time";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    background-color: black;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Time />
    </div>
  );
}

export default App;
