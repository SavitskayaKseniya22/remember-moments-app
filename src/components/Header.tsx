import React from "react";
import styled from "styled-components";
import { Time } from "./Time";
import { AccountHeader } from "./AccountHeader";

export const StyledHeader = styled("header")``;

export function Header() {
  return (
    <StyledHeader>
      <Time />
      <AccountHeader />
    </StyledHeader>
  );
}
