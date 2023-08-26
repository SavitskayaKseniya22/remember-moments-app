import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import planes from "../../assets/images/planes.png";

export const StyledLogo = styled("div")`
  position: relative;
  background: no-repeat right 0 bottom 50% url(${planes});
  background-size: 55%;
  width: 205px;

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
      <NavLink to="/" className="logo__link">
        <h1 className="logo__title">Journeys</h1>
      </NavLink>
    </StyledLogo>
  );
}
