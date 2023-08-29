import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  p,
  ul{
  margin:0;
  }

  ul{
  list-style:none;
  padding:0;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }

  #root{
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
  }
`;

export default GlobalStyle;
