import React from "react";
import styled from "styled-components";
import { Settings, LogIn } from "@styled-icons/ionicons-outline";

import { Time } from "./Time";
import { StyledRedButton } from "../styledComponents/StyledButton";

export const StyledHeader = styled("header")`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  display: flex;
  align-items: center;
`;

export function Header() {
  return (
    <StyledHeader>
      <StyledRedButton type="button" path="settings">
        <Settings title="Settings" size="48" />
      </StyledRedButton>
      <Time />
      <StyledRedButton type="button" path="auth">
        <LogIn title="Login" size="48" />
      </StyledRedButton>
    </StyledHeader>
  );
}
