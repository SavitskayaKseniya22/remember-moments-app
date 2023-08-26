import React from "react";
import styled from "styled-components";
import { Logo } from "./interface/Logo";
import MainNavigation from "./interface/Navigation";
import { Greetings } from "./interface/Greetings";
import { LoginToggle } from "./interface/LoginToggle";

export const StyledHeader = styled("header")`
  display: flex;
  justify-content: space-between;
  width: 1280px;
  margin: 0 auto;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;
  background-color: #fefcfb;
`;

export function Header() {
  return (
    <StyledHeader>
      <Logo />
      <MainNavigation />
      <Greetings />
      <LoginToggle />
    </StyledHeader>
  );
}
