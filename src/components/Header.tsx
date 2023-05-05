import React from "react";
import styled from "styled-components";
import { Time } from "./Time";

export const StyledHeader = styled("header")`
  background: rgba(5, 2, 50, 0.5);
`;

export function Header() {
  return (
    <StyledHeader>
      <Time />
    </StyledHeader>
  );
}
