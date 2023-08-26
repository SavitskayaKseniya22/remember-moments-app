import React from "react";
import styled from "styled-components";
import { Logo } from "./interface/Logo";
import { AccountHeader, Greetings } from "./AccountHeader";

export const StyledHeader = styled("header")`
  display: flex;
  flex-direction: column;
  width: 1280px;
  margin: 0 auto;

  .header_main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    gap: 2rem;
    padding: 0 1rem;
    background-color: #fefcfb;
  }

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    a {
      color: #666666;
      text-decoration: none;
    }
  }
`;

export function Header() {
  return (
    <StyledHeader>
      <div className="header_main">
        <Logo />
        <ul className="nav">
          <li>
            <a href="/auth/login">Plan a tour</a>
          </li>
          <li>
            <a href="/destinations">Destinations</a>
          </li>
          <li>
            <a href="/shop">Shop</a>
          </li>
        </ul>
        <Greetings />
      </div>
      <AccountHeader />
    </StyledHeader>
  );
}
