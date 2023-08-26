import React from "react";
import styled from "styled-components";
import planes from "../../assets/images/planes.png";

export const StyledLogo = styled("div")`
  position: relative;
  background: no-repeat right 0 bottom 50% url(${planes});
  background-size: 55%;

  .logo__title {
    margin: 0;
    font-family: "Volkhov", serif;
  }

  .logo__link {
    text-decoration: none;
    color: #fa7436;
    display: block;
    width: 100%;
    height: 100%;
    padding: 2rem;
    font-family: "Poppins", sans-serif;
  }
`;

export function Logo() {
  return (
    <StyledLogo>
      <a className="logo__link" href="/">
        <h1 className="logo__title">Journeys</h1>
      </a>
    </StyledLogo>
  );
}
