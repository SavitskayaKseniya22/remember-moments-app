import React from "react";
import styled from "styled-components";
import { LogInCircle } from "@styled-icons/boxicons-regular";
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
      <Time />
      <Button>
        <LogInCircle title="Login" size="48" />
      </Button>
    </StyledHeader>
  );
}
