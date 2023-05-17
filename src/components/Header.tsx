import React from "react";
import styled from "styled-components";
import { AccountHeader } from "./AccountHeader";
import { InfoHeader } from "./InfoHeader";

export const StyledHeader = styled("header")``;

export function Header() {
  return (
    <StyledHeader>
      <InfoHeader />
      <AccountHeader />
    </StyledHeader>
  );
}
