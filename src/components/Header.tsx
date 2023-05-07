import React from "react";
import styled from "styled-components";
import { Settings, LogIn } from "@styled-icons/ionicons-outline";

import { useNavigate } from "react-router-dom";
import { Time } from "./Time";
import { StyledRedButton } from "../styledComponents/StyledButton";

export const StyledHeader = styled("header")`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  display: flex;
  align-items: center;
`;

export function Header() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <StyledRedButton
        handleClick={() => {
          navigate("settings");
        }}
      >
        <Settings title="Settings" size="48" />
      </StyledRedButton>
      <Time />
      <StyledRedButton
        handleClick={() => {
          navigate("/auth/login");
        }}
      >
        <LogIn title="Login" size="48" />
      </StyledRedButton>
    </StyledHeader>
  );
}
