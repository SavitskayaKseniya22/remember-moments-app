import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";
import background from "../assets/images/landscape.jpg";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    color: #fcdffd;
    font-family: 'Fjalla One', sans-serif;
    
  }

  #root{
    width: 100vw;
    height: 100vh;
    background: no-repeat center url(${background});
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export default GlobalStyle;
