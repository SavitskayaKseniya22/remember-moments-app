import React from "react";
import styled from "styled-components";
import { Settings, LogIn } from "@styled-icons/ionicons-outline";
import { Time } from "./Time";
import Button from "../styledComponents/Button";

export const StyledHeader = styled("header")`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  display: flex;
  align-items: center;
`;

export function Header() {
  return (
    <StyledHeader>
      <Button path="settings">
        <Settings title="Settings" size="48" />
      </Button>
      <Time />
      <Button path="login">
        <LogIn title="Login" size="48" />
      </Button>
    </StyledHeader>
  );
}
