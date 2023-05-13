import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";
import background from "../assets/images/landscape.jpg";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
  }

  body {
    color: #fcdffd;
    font-family: 'Fjalla One', sans-serif;
    
  }

  #root{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &::after {
  content: "";
  background: no-repeat center url(${background});
  background-size: cover;
  opacity: 0.8;
  filter: grayscale(50%);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}
  }
`;

export default GlobalStyle;
